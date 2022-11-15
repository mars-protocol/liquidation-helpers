import { DeploymentConfig, Addresses } from '../../types/config'
import { Deployer } from './deployer'
export declare const setupDeployer: (
  config: DeploymentConfig,
  address: Addresses,
) => Promise<Deployer>
