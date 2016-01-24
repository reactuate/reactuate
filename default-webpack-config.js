var path = require('path')
var fs = require('fs')
var configFile = path.join(process.cwd(), "webpack.config.js")
if (fs.existsSync(configFile)) {
  console.log('Using webpack config ' + configFile)
}
var config = fs.existsSync(configFile) ? require(configFile) : {}
module.exports = require(path.join(__dirname, 'webpack-config'))(config)
module.exports._config = config
