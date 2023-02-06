use cosmwasm_std::{
    from_binary,
    testing::{mock_env, mock_info},
    SubMsg,
};
use mars_liquidation_filterer::{
    contract::{execute, instantiate, query},
    error::ContractError,
    msg::{ConfigResponse, ExecuteMsg, InstantiateMsg, QueryMsg},
    state::CONFIG,
};
use mars_owner::OwnerError::NotOwner;
use mars_testing::mock_dependencies;

use crate::helpers::setup_test;

mod helpers;

// init
#[test]
fn test_proper_initialization() {
    let mut deps = mock_dependencies(&[]);

    let info = mock_info("sender", &[]);
    let msg = InstantiateMsg {
        owner: String::from("owner"),
        address_provider: String::from("address_provider"),
    };

    let env = mock_env();
    let res = instantiate(deps.as_mut(), env.clone(), info, msg).unwrap();
    let empty_vec: Vec<SubMsg> = vec![];
    assert_eq!(empty_vec, res.messages);

    let res = query(deps.as_ref(), env, QueryMsg::Config {}).unwrap();
    let value: ConfigResponse = from_binary(&res).unwrap();
    assert_eq!(value.owner.unwrap(), "owner");
    assert_eq!(value.address_provider, "address_provider");
}

#[test]
fn test_update_config() {
    let mut deps = setup_test();

    // *
    // non owner is not authorized
    // *
    let msg = ExecuteMsg::UpdateConfig {
        address_provider: Some("new_address_provider".to_string()),
    };
    let info = mock_info("somebody", &[]);
    let error_res = execute(deps.as_mut(), mock_env(), info, msg).unwrap_err();
    assert_eq!(error_res, ContractError::Owner(NotOwner {}));

    // *
    // update config with new params
    // *
    let msg = ExecuteMsg::UpdateConfig {
        address_provider: Some("new_address_provider".to_string()),
    };
    let info = mock_info("owner", &[]);

    let res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();
    assert_eq!(0, res.messages.len());

    // Read config from state
    let new_config = CONFIG.load(deps.as_ref().storage).unwrap();
    assert_eq!(new_config.address_provider, "new_address_provider".to_string());
}
