'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Storage = exports.ARTIFACTS_PATH = void 0
const promises_1 = require('fs/promises')
const path_1 = __importDefault(require('path'))
exports.ARTIFACTS_PATH = '../artifacts/'
class Storage {
  constructor(chainId, items) {
    this.addresses = items.addresses
    this.codeIds = items.codeIds
    this.execute = items.execute
    this.chainId = chainId
  }
  static async load(chainId) {
    try {
      const data = await (0, promises_1.readFile)(
        path_1.default.join(exports.ARTIFACTS_PATH, `${chainId}.json`),
        'utf8',
      )
      const items = JSON.parse(data)
      return new this(chainId, items)
    } catch (e) {
      return new this(chainId, { addresses: {}, codeIds: {}, execute: {} })
    }
  }
  async save() {
    await (0, promises_1.writeFile)(
      path_1.default.join(exports.ARTIFACTS_PATH, `${this.chainId}.json`),
      JSON.stringify(this, null, 2),
    )
  }
}
exports.Storage = Storage
//# sourceMappingURL=storage.js.map
