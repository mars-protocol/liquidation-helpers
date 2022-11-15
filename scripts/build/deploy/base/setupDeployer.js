'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.setupDeployer = void 0
const cosmwasm_stargate_1 = require('@cosmjs/cosmwasm-stargate')
const proto_signing_1 = require('@cosmjs/proto-signing')
const stargate_1 = require('@cosmjs/stargate')
const deployer_1 = require('./deployer')
const storage_1 = require('./storage')
const getWallet = async (config) => {
  return await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(config.deployerMnemonic, {
    prefix: config.chainPrefix,
  })
}
const getDeployer = async (wallet) => {
  const accounts = await wallet.getAccounts()
  return accounts[0]?.address
}
const setupClient = async (config, wallet) => {
  const clientOption = {
    gasPrice: stargate_1.GasPrice.fromString(`0.1${config.baseAssetDenom}`),
  }
  return await cosmwasm_stargate_1.SigningCosmWasmClient.connectWithSigner(
    config.rpcEndpoint,
    wallet,
    clientOption,
  )
}
const setupDeployer = async (config, address) => {
  const wallet = await getWallet(config)
  const client = await setupClient(config, wallet)
  const deployerAddr = await getDeployer(wallet)
  const storage = await storage_1.Storage.load(config.chainId)
  return new deployer_1.Deployer(config, client, deployerAddr, storage, address)
}
exports.setupDeployer = setupDeployer
//# sourceMappingURL=setupDeployer.js.map
