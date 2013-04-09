var assert = require('assert');
module.exports = function(grunt) {
  grunt.registerTask('fail', 'Causes an assertion failure', function() {
    var done = this.async();
    setTimeout(function() {
      assert(false, 'broken');
    }, 0);
  });

  grunt.registerTask('okay', 'Pass through', function() {
    var done = this.async();
    setTimeout(function() {
      done();
    }, 0);
  });

  require('../../tasks/simple-mocha.js')(grunt);

  grunt.initConfig({
    simplemocha: {
      options: {
        // useColors: true,
        timeout: Infinity,
        reporter: 'tap'
      },
      one: ['../../test/fixtures/mocha_1.js'],
      two: ['../../test/fixtures/mocha_2.js']
    }
  });
};
