module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    copy: {
      main: {
        files: [{
          cwd: './src/assets/vendor/',
          dest: './dist/vendor/',
          expand: true,
          src: '**/*'
        },
        {
          cwd: './src/assets/css/',
          dest: './dist/css/',
          expand: true,
          src: '**/*'
        },
        {
          cwd: './src/assets/js/',
          dest: './dist/js/',
          expand: true,
          src: '**/*'
        },
        {
          cwd: './src/contents/page/handlebars/',
          dest: './dist/handlebars/',
          expand: true,
          src: '**/*.handlebars'
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
        flatten: true,
        layoutdir: './src/layouts/',
        partials: './src/partials/**/*.hbs'
      },
      page: {
        options: { layout: 'page.hbs' },
        files: [{
          cwd: './src/contents/page/',
          dest: './dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      },
      login: {
        options: { layout: 'login.hbs' },
        files: [{
          cwd: './src/contents/login/',
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

