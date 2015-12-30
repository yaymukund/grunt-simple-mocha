var assert = require('assert'),
    exec = require('child_process').exec,
    GRUNT = 'node_modules/grunt-cli/bin/grunt';

function grunt(gruntfile, done) {
  exec(GRUNT+' --gruntfile tests/fixtures/'+gruntfile+'.gruntfile.js', done);
}

describe('acceptance tests for simplemocha', function() {
  it('passes without error', function(done) {
    grunt('passing-test', function(error, stdout, stderr) {
      assert.ok(error === null);
      done();
    });
  });

  it('fails with code > 0', function(done) {
    grunt('failing-test', function(error, stdout, stderr) {
      assert.ok(error.code > 0);
      done();
    });
  });

  it('displays mocha error upon exit', function(done) {
    grunt('failing-test', function(error, stdout, stderr) {
      assert.ok(stdout.match(/1 failing/));
      done();
    });
  });

  it('fullTrace: true option exposes full stack trace', function(done) {
    grunt('failing-test-with-stacktrace', function(error, stdout, stderr) {
      assert.ok(stdout.match(/\s+at level2.*\n\s+at level1.*/));
      done();
    });
  });
});
