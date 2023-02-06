use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Uint128};

/// Global configuration
#[cw_serde]
pub struct Config {
    /// Address provider returns addresses for all protocol contracts
    pub address_provider: Addr,
}

/// Liquidate under-collateralized native loans. Coins used to repay must be sent in the
/// transaction this call is made.
#[cw_serde]
pub struct Liquidate {
    /// Denom of the collateral asset, which liquidator gets from the borrower
    pub collateral_denom: String,
    /// Denom of the debt asset
    pub debt_denom: String,
    /// The address of the borrower getting liquidated
    pub user_address: String,
    /// Amount of debt to be repayed
    pub amount: Uint128,
}
