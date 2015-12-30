module.exports = function(grunt) {
  grunt.loadTasks('../../tasks');

  grunt.initConfig({
    simplemocha: {
      options: { fullTrace: true },
      all: { src: ['./failing-test-with-stacktrace.js'] }
    }
  });

  grunt.registerTask('default', 'simplemocha');
};
