module.exports = function(grunt) {
  grunt.loadTasks('../../tasks');

  grunt.initConfig({
    simplemocha: {
      all: { src: ['./failing-test.js'] }
    }
  });

  grunt.registerTask('default', 'simplemocha');
};
