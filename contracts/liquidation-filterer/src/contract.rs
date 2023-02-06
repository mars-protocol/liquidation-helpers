use std::{collections::HashMap, ops::SubAssign};

#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    attr, coin, to_binary, Addr, BankMsg, Binary, CosmosMsg, Deps, DepsMut, Env, MessageInfo,
    Reply, Response, StdResult, SubMsg, WasmMsg,
};
use mars_owner::{OwnerInit::SetInitialOwner, OwnerUpdate};
use mars_red_bank_types::{
    address_provider, address_provider::MarsAddressType, error::MarsError, red_bank,
};
use mars_utils::helpers::option_string_to_addr;

use crate::{
    error::ContractError,
    msg::{ConfigResponse, ExecuteMsg, InstantiateMsg, QueryMsg},
    state::{CONFIG, OWNER},
    types::{Config, Liquidate},
};

pub const CONTRACT_NAME: &str = "crates.io:mars-liquidation-filterer";
pub const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

// INIT

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    cw2::set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    OWNER.initialize(
        deps.storage,
        deps.api,
        SetInitialOwner {
            owner: msg.owner,
        },
    )?;

    let config = Config {
        address_provider: deps.api.addr_validate(&msg.address_provider)?,
    };
    CONFIG.save(deps.storage, &config)?;

    Ok(Response::default())
}

// HANDLERS

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::UpdateOwner(update) => update_owner(deps, info, update),
        ExecuteMsg::UpdateConfig {
            address_provider,
        } => Ok(execute_update_config(deps, info, address_provider)?),
        ExecuteMsg::LiquidateMany {
            liquidations,
        } => execute_liquidate(deps, info, &env.contract.address, liquidations),
        ExecuteMsg::Refund {
            recipient,
        } => execute_refund(deps.as_ref(), &info.sender, &env.contract.address, &recipient),
    }
}

fn update_owner(
    deps: DepsMut,
    info: MessageInfo,
    update: OwnerUpdate,
) -> Result<Response, ContractError> {
    Ok(OWNER.update(deps, info, update)?)
}

fn execute_update_config(
    deps: DepsMut,
    info: MessageInfo,
    address_provider: Option<String>,
) -> Result<Response, ContractError> {
    OWNER.assert_owner(deps.storage, &info.sender)?;

    let mut config = CONFIG.load(deps.storage)?;
    config.address_provider =
        option_string_to_addr(deps.api, address_provider, config.address_provider)?;

    CONFIG.save(deps.storage, &config)?;

    let response =
        Response::new().add_attribute("action", "periphery/liquidation-filterer/update_config");

    Ok(response)
}

fn execute_liquidate(
    deps: DepsMut,
    info: MessageInfo,
    contract: &Addr,
    liquidations: Vec<Liquidate>,
) -> Result<Response, ContractError> {
    let config = CONFIG.load(deps.storage)?;

    let red_bank_addr = address_provider::helpers::query_address(
        deps.as_ref(),
        &config.address_provider,
        MarsAddressType::RedBank,
    )?;

    // There shouldn't be duplicated denoms.
    // The amount for a denom should be equal or greater than sum of all amounts from liquidate messages for the same denom.
    let mut funds: HashMap<_, _> = info.funds.into_iter().map(|c| (c.denom, c.amount)).collect();

    let submsgs = liquidations
        .into_iter()
        .enumerate()
        .map(|(idx, liquidate)| {
            // Check if there are enough funds sent to cover all liquidations
            match funds.get_mut(&liquidate.debt_denom) {
                Some(amount) if *amount >= liquidate.amount => amount.sub_assign(liquidate.amount),
                Some(_) => {
                    return Err(ContractError::InvalidFunds {
                        reason: format!("not enough {}", liquidate.debt_denom),
                    })
                }
                None => {
                    return Err(ContractError::InvalidFunds {
                        reason: format!("missing {}", liquidate.debt_denom),
                    })
                }
            }

            // Create red-bank liquidate msg with recipient address for receiving underlying collateral
            let liq_msg = to_red_bank_liquidate_msg(&red_bank_addr, &info.sender, &liquidate)?;

            // Use SubMsg to handle replies from liquidation
            Ok(SubMsg::reply_always(liq_msg, idx as u64))
        })
        .collect::<Result<Vec<_>, ContractError>>()?;

    let refund_msg = WasmMsg::Execute {
        contract_addr: contract.to_string(),
        msg: to_binary(&ExecuteMsg::Refund {
            recipient: info.sender.to_string(),
        })?,
        funds: vec![],
    };

    let response = Response::new()
        .add_attributes(vec![attr("action", "periphery/liquidation-filterer/liquidate_many")])
        .add_submessages(submsgs)
        .add_message(refund_msg);

    Ok(response)
}

fn execute_refund(
    deps: Deps,
    sender: &Addr,
    contract: &Addr,
    recipient: &str,
) -> Result<Response, ContractError> {
    // Only owner or contract itself (contract calls refund at the end of liquidation process) can withdraw funds
    if !(OWNER.is_owner(deps.storage, sender)? || sender == contract) {
        return Err(MarsError::Unauthorized {}.into());
    };

    let coins = deps.querier.query_all_balances(contract)?;

    if coins.is_empty() {
        return Ok(Response::new());
    }

    let coins_str = coins.iter().map(|coin| coin.to_string()).collect::<Vec<_>>().join(",");

    Ok(Response::new()
        .add_message(BankMsg::Send {
            to_address: recipient.to_string(),
            amount: coins,
        })
        .add_attribute("action", "periphery/liquidation-filterer/refund")
        .add_attribute("recipient", recipient)
        .add_attribute("coins", coins_str))
}

fn to_red_bank_liquidate_msg(
    red_bank_addr: &Addr,
    recipient: &Addr,
    liquidate: &Liquidate,
) -> StdResult<CosmosMsg> {
    Ok(CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: red_bank_addr.into(),
        msg: to_binary(&red_bank::ExecuteMsg::Liquidate {
            collateral_denom: liquidate.collateral_denom.clone(),
            user: liquidate.user_address.clone(),
            recipient: Some(recipient.to_string()),
        })?,
        funds: vec![coin(liquidate.amount.u128(), liquidate.debt_denom.clone())],
    }))
}

#[entry_point]
pub fn reply(_deps: DepsMut, _env: Env, reply: Reply) -> StdResult<Response> {
    let res = Response::new()
        .add_attribute("action", "periphery/liquidation-filterer/handle_reply")
        .add_attribute("id", reply.id.to_string())
        .add_attribute("success", reply.result.is_ok().to_string());

    let res = match reply.result.into_result() {
        Ok(_) => res,
        Err(error) => res.add_attribute("error", error),
    };

    Ok(res)
}

// QUERIES

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Config {} => to_binary(&query_config(deps)?),
    }
}

fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let owner_state = OWNER.query(deps.storage)?;
    let config = CONFIG.load(deps.storage)?;
    Ok(ConfigResponse {
        owner: owner_state.owner,
        proposed_new_owner: owner_state.proposed,
        address_provider: config.address_provider.to_string(),
    })
}
