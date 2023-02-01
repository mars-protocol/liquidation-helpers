import { taskRunner } from '../base'
import { osmosisMainnetAddresses, osmosisMainnet } from './config.js'

void (async function () {
  await taskRunner(osmosisMainnet, osmosisMainnetAddresses)
})()
