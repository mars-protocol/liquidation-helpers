#![allow(dead_code)]

use cosmwasm_std::{
    from_binary,
    testing::{mock_env, mock_info, MockApi, MockStorage},
    Coin, Deps, OwnedDeps,
};
use mars_liquidation_filterer::{
    contract::{instantiate, query},
    msg::{InstantiateMsg, QueryMsg},
};
use mars_testing::{mock_dependencies, MarsMockQuerier};

pub fn setup_test() -> OwnedDeps<MockStorage, MockApi, MarsMockQuerier> {
    setup_test_with_balance(&[])
}

pub fn setup_test_with_balance(
    balance: &[Coin],
) -> OwnedDeps<MockStorage, MockApi, MarsMockQuerier> {
    let mut deps = mock_dependencies(balance);

    let msg = InstantiateMsg {
        owner: String::from("owner"),
        address_provider: String::from("address_provider"),
    };
    let info = mock_info("owner", &[]);
    instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();

    deps
}

pub fn th_query<T: serde::de::DeserializeOwned>(deps: Deps, msg: QueryMsg) -> T {
    from_binary(&query(deps, mock_env(), msg).unwrap()).unwrap()
}
