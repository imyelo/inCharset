module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      options: {
        run: false
      },
      cmd: ['test/cmd/index.html'],
      global: ['test/global/index.html']
    },
    clean: {
      test: {
        src: ['test/cmd/app/case', 'test/global/app/case'],
        options: {
          force: true
        }
      }
    },
    copy: {
      test: {
        files: [
          {expand: true, cwd: './test/case/', src: ['**'], dest: 'test/cmd/app/case/'},
          {expand: true, cwd: './test/case/', src: ['**'], dest: 'test/global/app/case/'},
        ]
      }
    },
    watch: {
      test: {
        files: 'test/case/**',
        tasks: ['test-noclean']
      },
      libs: {
        files: 'libs/**',
        tasks: ['test-noclean']
      }
    },
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test-noclean', ['copy:test', 'mocha:cmd', 'mocha:global']);
  grunt.registerTask('test', ['test-noclean', 'clean:test']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('default', ['dev']);

};
