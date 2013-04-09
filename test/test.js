'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var should = require('should');

var grunt = require('grunt');
var gruntfileFixture = path.join('test', 'fixtures', 'Gruntfile.js');
var gruntBin = path.resolve('node_modules', '.bin', 'grunt');

// Descent with modification from grunt.util.spawn
var gruntSpawn = function(task, cb) {
  var args = ['--gruntfile', gruntfileFixture].concat([task]);
  var child = spawn(gruntBin, args);
  var stdout = '';
  var stderr = '';
  if (child.stdout) {
    child.stdout.on('data', function(buf) { stdout += buf; });
  }
  if (child.stderr) {
    child.stderr.on('data', function(buf) { stderr += buf; });
  }
  child.on('close', function(code) {
    cb(stdout, code, stderr);
  });
};

describe('grunt', function() {
  // Just testing that subprocessing grunt works
  it('can spawn properly', function (done) {
    gruntSpawn('okay', function (stdout, code) {
      code.should.eql(0, 'should have no error code');
      done();
    });
  });
  // Show that we get errors when we throw stuff
  it('returns errors to calling process', function (done) {
    gruntSpawn('fail', function (stdout, code) {
      code.should.not.eql(0, 'should return error code on assertion failure');
      var outHasFail = /Fatal error: broken/.test(stdout);
      should.ok(outHasFail, 'stdout should contain output indicating failure.');
      done();
    });
  });
});

describe('grunt-simplemocha', function() {
  // Show that we can spawn the grunt-simplemocha and get success
  it('can spawn properly', function (done) {
    gruntSpawn('simplemocha:one', function (stdout, code) {
      // console.log(stdout);
      should.ok(/# tests 3/.test(stdout), 'should have run 3 tests');
      should.ok(/# fail 0/.test(stdout), 'should have failed 0 tests');
      code.should.eql(0, 'should have no error code');
      done();
    });
  });
  // Show that our errors do not cause mocha/grunt to quit abruptly.
  // Instead, we should get a complete and meaningful printout.
  it('gets errors properly', function (done) {
    gruntSpawn('simplemocha:two', function (stdout, code) {
      // console.log(stdout);
      should.ok(/# tests 3/.test(stdout), 'should have run 3 tests');
      should.ok(/# fail 3/.test(stdout), 'should have failed 3 tests');
      code.should.eql(3, 'should have error code - task failure');
      done();
    });
  });
  // TODO(gregp): test useColor flag?
});
