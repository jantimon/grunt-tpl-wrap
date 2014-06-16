# grunt-tpl-wrap

> A grunt plugin to wrap file contents with a tpl template

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tpl-wrap --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tpl-wrap');
```

## The "tpl_wrap" task

### Overview
In your project's Gruntfile, add a section named `tpl_wrap` to the data object passed into `grunt.initConfig()`.

Concat all files or write all filenames into one file:

```js
grunt.initConfig({
  tpl_wrap: {
    options: {
      // Task-specific options go here.
      template: 'path/to/wrapper-template.tpl'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      files: {
        'tmp/concatinatedAndWrapped': ['**/*.txt']
      }
    },
  },
})
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options

In this example all files are gathered and passed to the wrapper-template.tpl.
Without the custom `prepare` callback there are six default variables available in the template:

 * fileContent: Concatenated contents of all files
 * files: All file contents in an array
 * src: The default grunt src array which contains all file paths
 * dest: The default grunt destination path
 * fileTitles: All file titles without path and extension in an array
 * fileTitle: The first file title

```js
grunt.initConfig({
  tpl_wrap: {
    options: {
      // Task-specific options go here.
      template: 'path/to/wrapper-template.tpl'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

#### Wrap each file

If you want to wrap each file e.g. add a javascript closure around several 
script files then you can use the grunt files `expand` flag.
It will pick each file one by one and generate a wrapped result for every file.
In this case there are four template variables available:

* fileTitle: The file title without extension or path
* fileContent: Content of the file
* src: The default grunt src array which contains the file path
* dest: The default grunt destination path

```js
grunt.initConfig({
  tpl_wrap: {
    options: {
      // Task-specific options go here.
      template: 'path/to/wrapper-template.tpl'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      files: [
          {
            expand: true,
            cwd: 'base/directory',
            src: ['*.txt'],
            dest: 'tmp/',
            ext: '.html',
            extDot: 'first'
          }
        ]
    },
  },
})
```

#### Preprocess

If you want to extend or manipulate the default template variables you may
do that in the optional `prepare` function.

```js
grunt.initConfig({
  tpl_wrap: {
    options: {
      // Task-specific options go here.
      template: 'path/to/wrapper-template.tpl',
      prepare: function(data) {
        data.fileCount = data.src.length;
        // Now you can use <%= fileCount %> in your template
      }
    },
    your_target: {
      // Target-specific file lists and/or options go here.
     
    },
  },
})

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Jan Nicklas. Licensed under the MIT license.
