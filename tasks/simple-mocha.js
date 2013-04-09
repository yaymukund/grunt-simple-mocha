/*
 * grunt-simple-mocha
 * https://github.com/yaymukund/grunt-simple-mocha
 *
 * Copyright (c) 2012 Mukund Lakshman
 * Licensed under the MIT license.
 */
"use strict";

var createDomain = require('domain').create;
var path = require('path');
var Mocha = require('mocha');
var mochaReporterBase = require('mocha/lib/reporters/base');
// Sigh.

module.exports = function(grunt) {
  grunt.registerMultiTask('simplemocha', 'Run tests with mocha', function() {
    var paths = this.filesSrc.map(function (file) {
        return path.resolve(file);
    });
    // Retrieve options from the grunt task.
    var options = this.options();
    var gruntDone = this.async();

    // Guard against a common failure mode
    if (paths.length === 0) {
      grunt.warn(
        'No files found in simplemocha:' + this.file.dest + ' task.'
      );
      return false;
    }

    // Set up the mocha instance with options and files.
    // This is copied from Mocha.prototype.run
    // We need to do this because we need the runner, and the runner
    //  is only held in that closure, not assigned to any instance properties.
    var mocha = new Mocha(options);
    paths.forEach(mocha.addFile.bind(mocha));
    if (mocha.files.length) {mocha.loadFiles();}
    var suite = mocha.suite;
    var mochaOpts = mocha.options;
    var runner = new Mocha.Runner(suite);
    var reporter = new mocha._reporter(runner);
    runner.ignoreLeaks = mochaOpts.ignoreLeaks;
    runner.asyncOnly = mochaOpts.asyncOnly;
    if (mochaOpts.grep) {runner.grep(mochaOpts.grep, mochaOpts.invert);}
    if (mochaOpts.globals) {runner.globals(mochaOpts.globals);}
    if (mochaOpts.growl) {mocha._growl(runner, reporter);}
    // Sigh.

    // We want color in our output, but when grunt-contrib-watch is used,
    //  mocha will detect that it's being run to a pipe rather than tty.
    // Mocha provides no way to force the use of colors, so, again, hack it.
    var priorUseColors = mochaReporterBase.useColors;
    if (options.useColors) {
      mochaReporterBase.useColors = true;
    }
    // Sigh.

    // The problem is due to grunt deciding to catch uncaughtException's
    //  and exit with an error code. (grunt/lib/grunt.js:58)
    // Even when we use a domain, the uncaughtException propagates up into
    //  the overall process's handler, so grunt nukes the world.
    // There is an improvement request in node for getting domain to eat
    //  exceptions through C++ rather than uncaughtException, see
    //  https://github.com/joyent/node/issues/4375
    // Once that goes through, this hack should be unnecessary.

    // // Strategy #1
    // // We need to replace grunt.fail.fatal since otherwise we'd
    // //  *exit the proccess* when an exception occurs.
    // var originalGruntFailFatal = grunt.fail.fatal;
    // grunt.fail.fatal = function(){}
    // var unmanageExceptions = function() {
    //   grunt.fail.fatal = originalGruntFailFatal;
    // }
    // // Ugh.

    // Strategy #2
    // More agnostic -- just remove *all* the uncaughtException handlers;
    //  they're almost certainly going to exit the process, which,
    //  in this case, is definitely not what we want.
    var uncaughtExceptionHandlers = process.listeners('uncaughtException');
    process.removeAllListeners('uncaughtException');
    var unmanageExceptions = function() {
      uncaughtExceptionHandlers.forEach(
        process.on.bind(process, 'uncaughtException'));
    };
    // Better, deals with more than just grunt?

    // Restore prior state.
    var restore = function() {
      mochaReporterBase.useColors = priorUseColors;
      unmanageExceptions();
    };

    // Create the domain, and pass any errors to the mocha runner
    var domain = createDomain();
    domain.on('error', runner.uncaught.bind(runner));

    // When we're done with mocha, dispose the domain
    var mochaDone = function(errCount) {
      var withoutErrors = (errCount === 0);
      restore(); // restore prior node state
      // Indicate whether we failed to the grunt task runner
      gruntDone(withoutErrors);
    };

    domain.run(function() {
      runner.run(mochaDone);
    });
  });
};
