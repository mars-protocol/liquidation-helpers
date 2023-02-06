# Liquidation Helpers

Helpers smart contracts

## Verify contracts

### For contracts deployed on the Osmosis chain

1. Install [Osmosisd][3]

2. Get the wasm binary executable on your local machine.

   ```bash
   git clone https://github.com/mars-protocol/liquidaiton-helpers.git
   git checkout <commit-id>
   cargo make rust-optimizer
   ```

   Note: Intel/Amd 64-bit processor is required. While there is experimental ARM support for CosmWasm/rust-optimizer, it's discouraged to use in production and the wasm bytecode will not match up to an Intel compiled wasm file.

3. Download the wasm from the chain.

   ```bash
   osmosisd query wasm code $CODEID -- $NODE download.wasm
   ```

4. Verify that the diff is empty between them. If any value is returned, then the wasm files differ.

   ```bash
   diff artifacts/$CONTRACTNAME.wasm download.wasm
   ```

5. Alternatively, compare the wasm files' checksums:

   ```bash
   sha256sum artifacts/$CONTRACTNAME.wasm download.wasm
   ```
## Environment set up

- Install [rustup][4]. Once installed, make sure you have the wasm32 target:

  ```bash
  rustup default stable
  rustup update stable
  rustup target add wasm32-unknown-unknown
  ```

- Install [cargo-make][5]

  ```bash
  cargo install --force cargo-make
  ```

- Install [Docker][6]

- Install [Node.js v16][7]

- Install [Yarn][8]


- Create the build folder:

   ```bash
   yarn build
   ```

- Compile all contracts:

   ```bash
   cargo make rust-optimizer
   ```

- Formatting:

   ```bash
   yarn format
   yarn lint
   ```
This compiles and optimizes all contracts, storing them in `/artifacts` directory along with `checksum.txt` which contains sha256 hashes of each of the `.wasm` files (The script just uses CosmWasm's [rust-optimizer][9]).

**Note:** Intel/Amd 64-bit processor is required. While there is experimental ARM support for CosmWasm/rust-optimizer, it's discouraged to use in production.

## Schemas

```bash
cargo make --makefile Makefile.toml generate-all-schemas
```

Creates JSON schema files for relevant contract calls, queries and query responses (See: [cosmwams-schema][10]).

## Deployment

Everything related to deployment must be ran from the `scripts` directory:

For the Osmosis Outpost: 
```bash
cd scripts
# for testnet deployment:
yarn deploy:osmosis-testnet

# for mainnet deployment:
yarn deploy:osmosis-mainnet
```
## Deployments

### osmosis-1

TBD

### osmo-test-4

| Contract             | Address                                                           |
|----------------------| ----------------------------------------------------------------- |
| liquidation-filterer | `` |

## License

Contents of this repository are open source under [GNU General Public License v3](./LICENSE) or later.
