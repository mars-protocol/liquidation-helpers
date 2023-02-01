# Liquidation Helpers

Helpers smart contracts

## Deploy scripts set up

Everything related to deployment must be ran from the `scripts` directory:

```bash
cd scripts
```

Set up yarn:

```bash
yarn install
```

Create the build folder:

```bash
yarn build
```

Compile all contracts:

```bash
yarn compile
```

This compiles and optimizes all contracts, storing them in `/artifacts` directory along with `checksum.txt` which contains sha256 hashes of each of the `.wasm` files (The script just uses CosmWasm's [rust-optimizer](https://github.com/CosmWasm/rust-optimizer)).

Note: Docker deamon must be running to run this command.

Formating must be done before running lint:

```bash
yarn format
```

Linting:

```bash
yarn lint
```

Now you're ready to deploy for an outpost.

## Deploying to an Outpost

Each outpost has a config file for its respective deployment and assets

For Osmosis:

```bash
yarn deploy:osmosis
```

## License

Contents of this repository are open source under [GNU General Public License v3](./LICENSE) or later.
