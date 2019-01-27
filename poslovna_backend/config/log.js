/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */
let path = require('path');
let pkgJSON = require(path.resolve('package.json'));
// let rotation = require('winston-daily-rotate-file');

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/
  // This options are for Console transport that is used by default
  level: 'info',  // you are familiar with this value, right? - silly, debug, verbose, info , warn, error
  timestamp: true, // if you want to output the timestamp in the console transport

  // Transports
  // more information: https://github.com/winstonjs/winston/blob/master/docs/transports.md
  // transports: [
  //   {
  //     module: rotation,
  //     config: {
  //       dirname: path.resolve('logs'),
  //       datePattern: '.yyyy-MM-dd.log',
  //       filename: pkgJSON.name,
  //       prettyPrint: true,
  //       timestamp: true,
  //       level: 'silly'
  //     }
  //   },
  //   {
  //     module: require('winston-logio').Logio,
  //     config: {
  //       port: 28777,
  //       node_name: pkgJSON.name,
  //       host: '127.0.0.1'
  //     }
  //   }
  // ]

  // level: 'info'

};
