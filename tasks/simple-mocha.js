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

  grunt.registerMultiTask('simplemocha', 'Run tests with mocha', function() {

    var options = this.options(),
        mocha_instance = new Mocha(options);

    this.filesSrc.forEach(mocha_instance.addFile.bind(mocha_instance));

    // We will now run mocha asynchronously and receive number of errors in a
    // callback, which we'll use to report the result of the async task by
    // calling done() with the appropriate value to indicate whether an error
    // occurred.

    var done = this.async();

    // Exceptions thrown from here will not trigger a Grunt task failure.
    // We must manually fail the task.
    //
    // Calling run() on mocha_instance will cause all files provided to
    // mocha_instance.addFile to load and run. Exceptions encountered while
    // loading these files will show up here (for instance, mistyping a require
    // in a spec file).
    try {
      mocha_instance.run(function(errCount) {
        var withoutErrors = (errCount === 0);
        done(withoutErrors);
      });
    } catch (e) {
      grunt.fail.fatal(e);
    }
  });
};
