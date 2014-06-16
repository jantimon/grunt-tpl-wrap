/*
 * grunt-tpl-wrap
 * https://github.com/jantimon/grunt-tpl-wrap
 *
 * Copyright (c) 2014 Jan Nicklas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    tpl_wrap: {
      default_options: {
        options: {
          template: 'test/fixtures/template1.tpl'
        },
        files: {
          'tmp/default_options': ['test/fixtures/*.md', 'test/fixtures/*.txt']
        }
      },
      custom_options: {
        options: {
          template: 'test/fixtures/template2.tpl',
          prepare: function(data) {
            // Add a list of all txt files
            data.txtFiles = data.src.filter(function(fileName){
              return fileName.match(/\.txt$/);
            });
          }
        },
        files: {
          'tmp/custom_options': ['test/fixtures/*.md', 'test/fixtures/*.txt']
        }
      },
      expand: {
        options: {
          template: 'test/fixtures/template3.tpl'
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/',
            src: ['*.txt'],
            dest: 'tmp/',
            ext: '.html',
            extDot: 'first'
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'tpl_wrap', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
