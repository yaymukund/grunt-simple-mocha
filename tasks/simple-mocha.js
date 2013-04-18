/*
 * grunt-simple-mocha
 * https://github.com/yaymukund/grunt-simple-mocha
 *
 * Copyright (c) 2012 Mukund Lakshman
 * Licensed under the MIT license.
 */
"use strict";

module.exports = function(grunt) {

  var path = require('path'),
      Mocha = require('mocha');

  // From https://gist.github.com/pguillory/729616
  function hook_stdout(callback) {
      var old_write = process.stdout.write
   
      process.stdout.write = (function(write) {
          return function(string, encoding, fd) {
              write.apply(process.stdout, arguments)
              callback(string, encoding, fd)
          }
      })(process.stdout.write)
   
      return function() {
          process.stdout.write = old_write
      }
  }

  grunt.registerMultiTask('simplemocha', 'Run tests with mocha', function() {

    var options = this.options(),
        mocha_instance = new Mocha(options);
    var dest, reporterOut = '';
    if (this.files && this.files.length > 0 && this.files[0].dest) {
      dest = this.files[0].dest;
    }

    this.filesSrc.forEach(mocha_instance.addFile.bind(mocha_instance));

    // We will now run mocha asynchronously and receive number of errors in a
    // callback, which we'll use to report the result of the async task by
    // calling done() with the appropriate value to indicate whether an error
    // occurred.

    var done = this.async();

    // If there's a destination specified, copy the stdout of the reporter
    if (dest) {
      var unhook = hook_stdout(function(str, enc, fd) {
          reporterOut += str;
      });
    }

    mocha_instance.run(function(errCount) {
      var withoutErrors = (errCount === 0);
      if (dest) {
        unhook(); // Return output to normal
        grunt.file.write(dest,reporterOut);
      }
      done(withoutErrors);
    });
  });
};
