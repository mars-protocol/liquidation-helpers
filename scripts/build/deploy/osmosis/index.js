'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const base_1 = require('../base')
const config_js_1 = require('./config.js')
void (async function () {
  await (0, base_1.taskRunner)(config_js_1.osmosisTestnetConfig, config_js_1.osmosisAddresses)
})()
//# sourceMappingURL=index.js.map
