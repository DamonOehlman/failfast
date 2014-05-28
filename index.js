var path = require('path');
var fs = require('fs');

/**
  # failfast

  A simple module that will write to an `error.log` file when an
  `uncaughtException` event is triggered at the `process` object.  The process
  is exited as it would be if the exception was not handled.

  ## Example Usage

  <<< examples/simple.js

**/

var failfast = module.exports = function(targetPath, opts) {
  var errorLog = path.resolve(targetPath, 'error.log');
  var errorCode = (opts || {}).errorCode || 1;

  process.on('uncaughtException', function(err) {
    // check that we can write to the target path
    fs.exists(targetPath || process.cwd(), function(exists) {
      // if the target path does not exist, then abort
      if (! exists) {
        return process.exit(errorCode);
      }


      fs.appendFile(errorLog, err.stack, function(err) {
        // if we didn't log, then well it's a shame but we need to exit anyway
        process.exit(errorCode);
      });
    });
  });

};
