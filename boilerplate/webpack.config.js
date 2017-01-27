var setup = require( './env.config' )
var configurator = require( './webpack' )

module.exports = configurator( setup() ).resolve()
