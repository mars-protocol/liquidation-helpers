import { DeploymentConfig, Addresses } from '../../types/config'

export const osmosisTestnetConfig: DeploymentConfig = {
  chainName: 'osmosis',
  baseAssetDenom: 'uosmo',
  chainId: 'osmo-test-4',
  chainPrefix: 'osmo',
  rpcEndpoint: 'https://rpc-test.osmosis.zone',
  deployerMnemonic:
    'elevator august inherit simple buddy giggle zone despair marine rich swim danger blur people hundred faint ladder wet toe strong blade utility trial process',
}

export const osmosisLocalConfig: DeploymentConfig = {
  chainName: 'osmosis',
  baseAssetDenom: 'uosmo',
  chainId: 'localosmosis',
  chainPrefix: 'osmo',
  rpcEndpoint: 'http://localhost:26657',
  deployerMnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
}
export const osmosisMainnet: DeploymentConfig = {
  chainName: 'osmosis',
  baseAssetDenom: 'uosmo',
  chainId: 'osmosis-1',
  chainPrefix: 'osmo',
  rpcEndpoint: 'https://rpc.osmosis.zone',
  deployerMnemonic: 'TO BE INSERTED AT TIME OF DEPLOYMENT',
}
export const osmosisTestnetAddresses: Addresses = {
  multisig: 'osmo14w4x949nwcrqgfe53pxs3k7x53p0gvlrq34l5n',
  addressProvider: 'osmo17dyy6hyzzy6u5khy5lau7afa2y9kwknu0aprwqn8twndw2qhv8ls6msnjr',
}

// FIXME: Add in mainnet addr provider addr before deployment
export const osmosisMainnetAddresses: Addresses = {
  multisig: 'osmo14w4x949nwcrqgfe53pxs3k7x53p0gvlrq34l5n',
  addressProvider: 'TO BE INSERTED AT DEPLOYMENT',
}
