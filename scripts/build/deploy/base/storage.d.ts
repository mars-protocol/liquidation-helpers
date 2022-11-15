import { StorageItems } from '../../types/storageItems'
export declare const ARTIFACTS_PATH = '../artifacts/'
export declare class Storage implements StorageItems {
  addresses: StorageItems['addresses']
  codeIds: StorageItems['codeIds']
  execute: StorageItems['execute']
  private readonly chainId
  constructor(chainId: string, items: StorageItems)
  static load(chainId: string): Promise<Storage>
  save(): Promise<void>
}
