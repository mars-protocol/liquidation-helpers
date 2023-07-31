import { taskRunner } from '../base'
import { neutronMainnetAddresses, neutronMainnet } from './config.js'

void (async function () {
  await taskRunner(neutronMainnet, neutronMainnetAddresses)
})()
