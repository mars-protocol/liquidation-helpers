import { DeploymentConfig, Addresses } from '../../types/config'

export const neutronTestnetConfig: DeploymentConfig = {
  chainName: 'neutron',
  baseAssetDenom: 'uusd',
  chainId: 'pion-1',
  chainPrefix: 'neutron',
  rpcEndpoint: 'https://testnet-neutron-rpc.marsprotocol.io:443',
  deployerMnemonic:
  'bundle bundle orchard jeans office umbrella bird around taxi arrive infant discover elder they joy misery photo crunch gift fancy pledge attend adult eight',
}

export const neutronLocalConfig: DeploymentConfig = {
  chainName: 'neutron',
  baseAssetDenom: 'uosmo',
  chainId: 'localneutron',
  chainPrefix: 'neutron',
  rpcEndpoint: 'https://testnet-neutron-rpc.marsprotocol.io:443',
  deployerMnemonic:
  'bundle bundle orchard jeans office umbrella bird around taxi arrive infant discover elder they joy misery photo crunch gift fancy pledge attend adult eight',
}

export const neutronMainnet: DeploymentConfig = {
  chainName: 'neutron',
  baseAssetDenom: 'uosmo',
  chainId: 'neutron-1',
  chainPrefix: 'neutron',
  rpcEndpoint: 'https://neutron.rpc.p2p.world:443/qgrnU6PsQZA8F9S5Fb8Fn3tV3kXmMBl2M9bcc9jWLjQy8p',
  deployerMnemonic: 'TODO',
}

// TODO: Add in testnet addr provider addr before deployment
export const neutronTestnetAddresses: Addresses = {
  multisig: 'neutron1ltzuv25ltw9mkwuvvmt7e54a6ene283hfj7l0c',
  addressProvider: 'TODO',
}

// TODO: Add in mainnet addr provider addr before deployment
export const neutronMainnetAddresses: Addresses = {
  multisig: 'neutron1ltzuv25ltw9mkwuvvmt7e54a6ene283hfj7l0c',
  addressProvider: 'TODO',
}
