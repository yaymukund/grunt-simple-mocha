var assert = require('assert');

function level2() {
  throw new Error('It failed!');
}

function level1() {
  level2();
}

describe('a failing test', function() {
  it('should succeed', function() {
    // But it doesn't...
    level1();
  });
});
