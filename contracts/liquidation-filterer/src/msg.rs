use cosmwasm_schema::{cw_serde, QueryResponses};
use mars_owner::OwnerUpdate;

use crate::types::Liquidate;

#[cw_serde]
pub struct InstantiateMsg {
    pub owner: String,
    /// Address provider returns addresses for all protocol contracts
    pub address_provider: String,
}

#[cw_serde]
pub enum ExecuteMsg {
    /// Manages admin role state
    UpdateOwner(OwnerUpdate),

    /// Update contract config (only callable by owner)
    UpdateConfig {
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
    #[returns(ConfigResponse)]
    Config {},
}

#[cw_serde]
pub struct ConfigResponse {
    /// The contract's owner
    pub owner: Option<String>,
    /// The contract's proposed owner
    pub proposed_new_owner: Option<String>,
    /// Address provider returns addresses for all protocol contracts
    pub address_provider: String,
}
