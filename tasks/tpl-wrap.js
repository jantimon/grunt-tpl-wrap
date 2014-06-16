/*
 * grunt-tpl-wrap
 * https://github.com/jantimon/grunt-tpl-wrap
 *
 * Copyright (c) 2014 Jan Nicklas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tpl-wrap', 'A grunt plugin to wrap file contents with a tpl template', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      template: null,
      prepare: function (/* data */) {
      },
      'data': {},
      'delimiters': 'config' // Default delimiters.
    });

    // Read the template file once
    var template = grunt.file.read(options.template);

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      // From https://github.com/mathiasbynens/grunt-template/blob/master/
      // Allow to provide custom template data using an object or a function
      var templateOptions = {
        'data': (typeof options.data === 'function' ?
          options.data() :
          options.data) || {}
      };

      if (options.delimiters) {
        templateOptions.delimiters = typeof options.delimiters === 'function' ?
        options.delimiters() :
        options.delimiters;
      }

      // Pass the file content
      var fileContents = src.map(function (filePath) {
        return grunt.file.read(filePath);
      });

      templateOptions.data.fileContent = fileContents.join('');
      templateOptions.data.files = fileContents;
      templateOptions.data.src = src;
      templateOptions.data.dest = file.dest;
      templateOptions.data.fileTitles = src.map(function (filePath) {
        // Return only the file base name without extension or path
        return filePath.replace(/(^|.+\/)([^\/\.]+)\..+$/, '$2');
      });
      templateOptions.data.fileTitle = templateOptions.data.fileTitles[0];

      // Preprocess
      options.prepare(templateOptions.data);

      if (options.delimiters) {
        templateOptions.delimiters = typeof options.delimiters === 'function' ?
          options.delimiters() :
          options.delimiters;
      }
  
      var result = grunt.template.process(template, templateOptions);

      // Write the destination file
      grunt.file.write(file.dest, result);
    });

    // Print a success message
    grunt.log.writeln(this.files.length + ' files wrapped using ' + options.template);

  });

};
