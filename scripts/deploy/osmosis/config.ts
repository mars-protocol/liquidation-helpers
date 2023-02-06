import { DeploymentConfig, Addresses } from '../../types/config'

export const osmosisTestnetConfig: DeploymentConfig = {
  chainName: 'osmosis',
  atomDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  baseAssetDenom: 'uosmo',
  chainId: 'osmo-test-4',
  chainPrefix: 'osmo',
  rpcEndpoint: 'https://rpc-test.osmosis.zone',
  safetyFundFeeShare: '0.2',
  timeoutRevision: 1,
  deployerMnemonic:
    'elevator august inherit simple buddy giggle zone despair marine rich swim danger blur people hundred faint ladder wet toe strong blade utility trial process',
  slippage_tolerance: '0.5',
  base_asset_symbol: 'OSMO',
  second_asset_symbol: 'ATOM',
}

export const osmosisLocalConfig: DeploymentConfig = {
  chainName: 'osmosis',
  atomDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  baseAssetDenom: 'uosmo',
  chainId: 'localosmosis',
  chainPrefix: 'osmo',
  rpcEndpoint: 'http://localhost:26657',
  safetyFundFeeShare: '0.2',
  timeoutRevision: 1,
  deployerMnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  slippage_tolerance: '0.5',
  base_asset_symbol: 'OSMO',
  second_asset_symbol: 'ATOM',
}
export const osmosisMainnet: DeploymentConfig = {
  chainName: 'osmosis',
  atomDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  baseAssetDenom: 'uosmo',
  chainId: 'osmosis-1',
  chainPrefix: 'osmo',
  rpcEndpoint: 'https://rpc.osmosis.zone',
  safetyFundFeeShare: '0.2',
  timeoutRevision: 1,
  deployerMnemonic: 'TO BE INSERTED AT TIME OF DEPLOYMENT',
  slippage_tolerance: '0.1',
  base_asset_symbol: 'OSMO',
  second_asset_symbol: 'ATOM',
}
export const osmosisTestnetAddresses: Addresses = {
  multisig: 'osmo14w4x949nwcrqgfe53pxs3k7x53p0gvlrq34l5n',
  addressProvider: 'osmo1cnsrp4aj2wq8gx0eyelc4r8aj0m6s9mct6gdhxwlaymaczfayvyq9rxrm2',
}

// FIXME: Add in mainnet addr provider addr before deployment
export const osmosisMainnetAddresses: Addresses = {
  multisig: 'osmo14w4x949nwcrqgfe53pxs3k7x53p0gvlrq34l5n',
  addressProvider: 'TO BE INSERTED AT DEPLOYMENT',
}
