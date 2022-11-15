'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Deployer = void 0
const fs = __importStar(require('fs'))
const chalk_1 = require('../../utils/chalk')
const storage_1 = require('./storage')
const promises_1 = require('fs/promises')
const path_1 = require('path')
const assert_1 = __importDefault(require('assert'))
class Deployer {
  constructor(config, client, deployerAddress, storage, addresses) {
    this.config = config
    this.client = client
    this.deployerAddress = deployerAddress
    this.storage = storage
    this.addresses = addresses
  }
  async saveStorage() {
    await this.storage.save()
  }
  async assertDeployerBalance() {
    const accountBalance = await this.client.getBalance(
      this.deployerAddress,
      this.config.baseAssetDenom,
    )
    ;(0, chalk_1.printYellow)(
      `${this.config.baseAssetDenom} account balance is: ${accountBalance.amount} (${
        Number(accountBalance.amount) / 1e6
      } ${this.config.chainPrefix})`,
    )
    if (Number(accountBalance.amount) < 1000000 && this.config.chainId === 'osmo-test-4') {
      ;(0, chalk_1.printRed)(
        `not enough ${this.config.chainPrefix} tokens to complete action, you may need to go to a test faucet to get more tokens.`,
      )
    }
  }
  async upload(name, file) {
    if (this.storage.codeIds[name]) {
      ;(0, chalk_1.printBlue)(`Wasm already uploaded :: ${name} :: ${this.storage.codeIds[name]}`)
      return
    }
    const wasm = fs.readFileSync(storage_1.ARTIFACTS_PATH + file)
    const uploadResult = await this.client.upload(this.deployerAddress, wasm, 'auto')
    this.storage.codeIds[name] = uploadResult.codeId
    ;(0, chalk_1.printGreen)(`${this.config.chainId} :: ${name} : ${this.storage.codeIds[name]}`)
  }
  async instantiate(name, codeId, msg) {
    if (this.storage.addresses[name]) {
      ;(0, chalk_1.printBlue)(
        `Contract already instantiated :: ${name} :: ${this.storage.addresses[name]}`,
      )
      return
    }
    const { contractAddress: redBankContractAddress } = await this.client.instantiate(
      this.deployerAddress,
      codeId,
      msg,
      `mars-${name}`,
      'auto',
      { admin: this.addresses.multisig },
    )
    this.storage.addresses[name] = redBankContractAddress
    ;(0, chalk_1.printGreen)(
      `${this.config.chainId} :: ${name} Contract Address : ${this.storage.addresses[name]}`,
    )
  }
  async instantiateLiquidationFilterer() {
    const msg = {
      owner: this.deployerAddress,
      address_provider: this.addresses.addressProvider,
    }
    await this.instantiate('liquidationFilterer', this.storage.codeIds.liquidationFilterer, msg)
  }
  async saveDeploymentAddrsToFile() {
    const addressesDir = (0, path_1.resolve)(
      (0, path_1.join)(__dirname, '../../../deploy/addresses'),
    )
    await (0, promises_1.writeFile)(
      `${addressesDir}/${this.config.chainId}.json`,
      JSON.stringify(this.storage.addresses),
    )
  }
  async updateFiltererContractOwner() {
    const msg = {
      update_config: {
        owner: this.addresses.multisig,
      },
    }
    await this.client.execute(
      this.deployerAddress,
      this.storage.addresses.liquidationFilterer,
      msg,
      'auto',
    )
    ;(0, chalk_1.printYellow)('Owner updated to Mutlisig for Liquidation Filterer')
    const filtererConfig = await this.client.queryContractSmart(
      this.storage.addresses.liquidationFilterer,
      {
        config: {},
      },
    )
    assert_1.default.equal(filtererConfig.owner, this.addresses.multisig)
    ;(0, chalk_1.printGreen)(
      'It is confirmed that all contracts have transferred ownership to the Multisig',
    )
  }
}
exports.Deployer = Deployer
//# sourceMappingURL=deployer.js.map
