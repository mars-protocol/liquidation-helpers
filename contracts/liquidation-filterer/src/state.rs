use cw_storage_plus::Item;
use mars_owner::Owner;

use crate::types::Config;

pub const OWNER: Owner = Owner::new("owner");
pub const CONFIG: Item<Config> = Item::new("config");
