export interface DeploymentConfig {
  chainName: string
  baseAssetDenom: string
  atomDenom: string
  chainPrefix: string
  safetyFundFeeShare: string
  timeoutRevision: number
  chainId: string
  rpcEndpoint: string
  deployerMnemonic: string
  slippage_tolerance: string
  base_asset_symbol: string
  second_asset_symbol: string
}

export interface Addresses {
  multisig: string
  addressProvider: string
}
