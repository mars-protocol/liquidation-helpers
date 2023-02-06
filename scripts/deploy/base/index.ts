import { setupDeployer } from './setupDeployer'
import { DeploymentConfig, Addresses } from '../../types/config'
import { printRed } from '../../utils/chalk'

export const taskRunner = async (config: DeploymentConfig, address: Addresses) => {
  const deployer = await setupDeployer(config, address)

  try {
    await deployer.assertDeployerBalance()

    // Upload contracts
    await deployer.upload('liquidation-filterer', 'mars_liquidation_filterer.wasm')

    // Instantiate contracts
    await deployer.instantiateLiquidationFilterer()
    await deployer.saveDeploymentAddrsToFile()

    // update owner to multisig address
    await deployer.updateFiltererContractOwner()
  } catch (e) {
    printRed(e)
  } finally {
    await deployer.saveStorage()
  }
}
