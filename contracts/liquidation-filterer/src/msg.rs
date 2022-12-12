use crate::types::Liquidate;
use cosmwasm_schema::{cw_serde, QueryResponses};

#[cw_serde]
pub struct InstantiateMsg {
    /// Contract owner
    pub owner: String,
    /// Address provider returns addresses for all protocol contracts
    pub address_provider: String,
}

#[cw_serde]
pub enum ExecuteMsg {
    /// Update contract config (only callable by owner)
    UpdateConfig {
        owner: Option<String>,
        address_provider: Option<String>,
    },

    /// Liquidate many position for a user
    LiquidateMany {
        liquidations: Vec<Liquidate>,
    },

    /// Withdraw all coins held by the contract to the designated recipient
    Refund {
        recipient: String,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    /// Query contract config
    #[returns(crate::types::Config)]
    Config {},
}
