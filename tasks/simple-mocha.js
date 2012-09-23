/*
 * grunt-simple-mocha
 * https://github.com/yaymukund/grunt-simple-mocha
 *
 * Copyright (c) 2012 Mukund Lakshman
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  var path = require('path'),
      Mocha = require('mocha');

  grunt.registerMultiTask('simplemocha', 'Run tests with mocha', function() {

    var filepaths = grunt.file.expandFiles(this.file.src);
    grunt.file.clearRequireCache(filepaths);

    var paths = filepaths.map(path.resolve),
        options = this.data.options || {},
        mocha_instance = new Mocha(options);

    paths.map(mocha_instance.addFile.bind(mocha_instance));

    // we will now run mocha asynchronously and receive number of errors in a callback,
    // which we'll use to report the result of the async task by calling done() with
    // the appropriate value to indicate whether an error occurred
    var done = this.async();
    mocha_instance.run(function(errCount) {
      // => done(false) if there were errors, done(true) if no errors
      var withoutErrors = (0 === errCount);
      done(withoutErrors);
    });

  });
};
