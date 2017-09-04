module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    copy: {
      main: {
        files: [{
          cwd: './src/vendor/',
          dest: './dist/vendor/',
          expand: true,
          src: '**/*'
        },
        {
          cwd: './src/css/',
          dest: './dist/css/',
          expand: true,
          src: '**/*'
        },
        {
          cwd: './src/js/',
          dest: './dist/js/',
          expand: true,
          src: '**/*'
        }]
      }
    },

    connect: {
      dev: {
        options: {
          port: 8000,
          base: './dist/'
        }
      }
    },

    assemble: {
      options: {
        layout: 'page.hbs',
        layoutdir: './src/layouts/',
        partials: './src/partials/**/*.hbs'
      },
      contents: {
        files: [{
          cwd: './src/contents/',
          dest: './dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-assemble');

  /* grunt tasks */
  grunt.registerTask('default', ['assemble', 'connect', 'copy']);
};

