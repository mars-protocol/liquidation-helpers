import { taskRunner } from '../base'
import { neutronTestnetAddresses, neutronTestnetConfig } from './config.js'

void (async function () {
  await taskRunner(neutronTestnetConfig, neutronTestnetAddresses)
})()
