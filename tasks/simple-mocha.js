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

    var paths = this.file.src.map(path.resolve),
        assertionLibs = {
          should: 'node_modules/should/lib/should',
          expect: 'node_modules/expect/expect',
          chai: 'node_modules/chai/chai'
        },
        options = this.options(),
        mocha_instance = new Mocha(options);

    //optionally include assertion lib
    if(options.require){
      mocha_instance.addFile.call(mocha_instance, path.resolve(assertionLibs[options.require]));
    }
    paths.map(mocha_instance.addFile.bind(mocha_instance));

    // We will now run mocha asynchronously and receive number of errors in a
    // callback, which we'll use to report the result of the async task by
    // calling done() with the appropriate value to indicate whether an error
    // occurred.

    var done = this.async();

    mocha_instance.run(function(errCount) {
      var withoutErrors = (errCount === 0);
      done(withoutErrors);
    });
  });
};
