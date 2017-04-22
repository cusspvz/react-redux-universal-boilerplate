var setup = require( './env.config' )
var configurator = require( './webpack' )

// browser / development
var browserEnv = setup( 'development', 'browser' )
var browserConfig = configurator( browserEnv ).resolve()

// node / development
var nodeEnv = setup( 'development', 'node' )
var nodeConfig = configurator( nodeEnv ).resolve()

// Webpack compiled
var Webpack = require( 'webpack' )
var webpackConfigs = [ browserConfig, nodeConfig ]
var compiler = Webpack( webpackConfigs )

// Watch for changes and save them to disk
var nodeHadErrorsBefore = false
var watcher = compiler.watch({}, function (err, stats) {
  var name =  stats.compilation.name

  if ( err ) {
    console.log( '[build-server]: Bundle '+name+' has errors!')
    return
  }

  console.log( '[build-server]: Bundle '+name+' has changed!' )

  if ( name == nodeConfig.name ) {
    if ( nodeMon ) {

      // Restart only if it had errors, since HMR handles other cases
      if ( nodeHadErrorsBefore ) {
        nodeMon.restart()
      }

    } else {
      startServerMon()
    }

    nodeHadErrorsBefore = stats.hasErrors()
  }

})

// Express
var Express = require( 'express' )
var app = Express()

// app.use(require("webpack-dev-middleware")( compiler, { noInfo: true } ))
app.use(require("webpack-hot-middleware")( compiler ))

var server = app.listen( 3001, function () {
  console.log( '[build-server]: Listening at ::3001' )
})

// Start node node, which pipes /browser requests to webpack's node (8081)
var Nodemon = require('nodemon')
var nodeMon

function startServerMon () {
  nodeMon = Nodemon({
    execMap: { js: 'node' },
    script: nodeConfig.output.path,
    ignore: ['*'],
    watch: false,
    stdin: false,
    ext: 'noop'
  })

  nodeMon.on('restart', function() {
    console.log('[node-server]: restarting!')
  })
}

// Handle watcher close on process exit
function terminate () {
  process.exit()

  if ( nodeMon ) {
    nodeMon.reset()
  }

  server.close() // Close http server
  watcher.close() // Stop watching for files

  // Graceful exit
  setTimeout(() => {
    // If it didn't exited yet, lets force the exit
    process.exit(1)
  }, 1000)
}
process.on('SIGINT', terminate)
process.on('SIGTERM', terminate)
