export interface DeploymentConfig {
  chainName: string
  baseAssetDenom: string
  chainPrefix: string
  chainId: string
  rpcEndpoint: string
  deployerMnemonic: string
}

export interface Addresses {
  multisig: string
  addressProvider: string
}
