import { taskRunner } from '../base'
import {osmosisTestnetAddresses, osmosisTestnetConfig} from './config.js'

void (async function () {
  await taskRunner(osmosisTestnetConfig, osmosisTestnetAddresses)
})()
