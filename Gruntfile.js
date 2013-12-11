module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      cmd: ['test/cmd/index.html']
    },
    clean: {
      test: {
        src: ['test/cmd/app/case'],
        options: {
          force: true
        }
      }
    },
    copy: {
      test: {
        files: [
          {expand: true, cwd: './test/case/', src: ['**'], dest: 'test/cmd/app/case/'},
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['copy:test', 'mocha:cmd', 'clean:test']);

};
