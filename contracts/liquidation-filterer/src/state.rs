use cw_storage_plus::Item;

use crate::types::Config;

// keys (for singleton)
pub const CONFIG: Item<Config> = Item::new("config");
