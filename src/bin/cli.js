const path = require("path");
var program  = require('commander')

const fetchConfig = async () => {
    program
    .option('-c, --config <path>', 'Path to the config file (default: i18next-parser.config.js)', 'translation-config.js')
    .option('-o, --output <path>', 'Path to the output directory (default: locales/$LOCALE/$NAMESPACE.json)')
    program.parse(process.argv)
    var config = {}
    try {
      config = require(path.resolve(program.config))
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.log('  [error] ' + 'Config file does not exist: ' + program.config)
      }
      else {
        throw err
      }
    }
    return config;
}

module.exports = fetchConfig