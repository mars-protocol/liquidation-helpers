'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.taskRunner = void 0
const setupDeployer_1 = require('./setupDeployer')
const chalk_1 = require('../../utils/chalk')
const taskRunner = async (config, address) => {
  const deployer = await (0, setupDeployer_1.setupDeployer)(config, address)
  try {
    await deployer.assertDeployerBalance()
    await deployer.upload('liquidationFilterer', 'mars_liquidation_filterer.wasm')
    await deployer.instantiateLiquidationFilterer()
    await deployer.saveDeploymentAddrsToFile()
    await deployer.updateFiltererContractOwner()
  } catch (e) {
    ;(0, chalk_1.printRed)(e)
  } finally {
    await deployer.saveStorage()
  }
}
exports.taskRunner = taskRunner
//# sourceMappingURL=index.js.map
