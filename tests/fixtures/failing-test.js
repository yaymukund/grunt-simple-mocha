var assert = require('assert');

describe('a failing test', function() {
  it('should succeed', function() {
    // But it doesn't...
    assert.equal(1, -1);
  });
});
