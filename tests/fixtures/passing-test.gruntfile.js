module.exports = function(grunt) {
  grunt.loadTasks('../../tasks');

  grunt.initConfig({
    simplemocha: {
      all: { src: ['./passing-test.js'] }
    }
  });

  grunt.registerTask('default', 'simplemocha');
};
