import { taskRunner } from '../base'
import {osmosisAddresses, osmosisMainnet} from './config.js'

void (async function () {
    await taskRunner(osmosisMainnet, osmosisAddresses)
})()
