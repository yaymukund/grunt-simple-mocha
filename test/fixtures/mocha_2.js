var assert = require('assert');

describe('ex2', function() {
  it('fails sync', function() {
    assert(false);
  });
  it('fails fake async', function(done) {
    assert(false);
    done();
  });
  it('fails real async', function(done) {
    setTimeout(function() {
      assert(false);
      done();
    });
  });
});
