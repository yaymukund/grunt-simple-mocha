module.exports = function(grunt) {
  grunt.loadTasks('../../tasks');

  grunt.initConfig({
    simplemocha: {
      all: { src: ['./error-on-load.js'] }
    }
  });

  grunt.registerTask('default', 'simplemocha');
};
