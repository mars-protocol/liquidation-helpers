import { DeploymentConfig, Addresses } from '../../types/config'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Storage } from './storage'
import { InstantiateMsgs } from '../../types/msg.js'
export declare class Deployer {
  config: DeploymentConfig
  client: SigningCosmWasmClient
  deployerAddress: string
  private storage
  addresses: Addresses
  constructor(
    config: DeploymentConfig,
    client: SigningCosmWasmClient,
    deployerAddress: string,
    storage: Storage,
    addresses: Addresses,
  )
  saveStorage(): Promise<void>
  assertDeployerBalance(): Promise<void>
  upload(name: keyof Storage['codeIds'], file: string): Promise<void>
  instantiate(name: keyof Storage['addresses'], codeId: number, msg: InstantiateMsgs): Promise<void>
  instantiateLiquidationFilterer(): Promise<void>
  saveDeploymentAddrsToFile(): Promise<void>
  updateFiltererContractOwner(): Promise<void>
}
