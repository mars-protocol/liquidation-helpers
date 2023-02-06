export interface StorageItems {
  codeIds: {
    'liquidation-filterer'?: number
    'address-provider'?: number
  }
  addresses: {
    'liquidation-filterer'?: string
    'address-provider'?: string
  }
  execute: {
    addressProviderUpdated?: boolean
  }
}
