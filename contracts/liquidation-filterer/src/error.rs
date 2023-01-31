use cosmwasm_std::StdError;
use mars_red_bank_types::error::MarsError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Mars(#[from] MarsError),

    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Invalid funds: {reason}")]
    InvalidFunds {
        reason: String,
    },
}
