# grunt-tpl-wrap [![Build status](https://travis-ci.org/jantimon/grunt-tpl-wrap.svg?branch=master)](https://travis-ci.org/jantimon/grunt-tpl-wrap)

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

The `options` property accepts the following options:

#### `template`
Type: `String`
Default: `undefined`

This option is required. It has to be set to the relative path of the wrapping template.

#### `data`
Type: `Object` or `Function`
Default: `{}`

This object contains the data that will be used while interpolating the template files. If you pass a function instead, it will be called when grunt-template needs the template data (lazy evaluation). This is useful if you want to load data from a file that is generated by another Grunt task, for example.

#### `prepare`
Type: `Function`
Default: `undefined`

This function is called with the `data` object right before the template rendering occurs to allow modifying the template options.

#### `delimiters`
Type: `String` or `Function`
Default: `config`

This is the delimiters' name that will be used to interpolate and evaluate code. A function that returns this name can be used too.
This property is useful when you want to generate JSP/ERB like code and you need the default interpolation delimiters to be `<%` and `%>`. See below for an example.

### Template syntax

Under the hood, grunt-template uses [`grunt.template.process`](https://github.com/gruntjs/grunt/wiki/grunt.template#wiki-grunt-template-process), which in turn relies on [Lo-Dash’s `_.template()` method](http://lodash.com/docs#template). Here’s a quick reminder of the default delimiters:

* Use `<%= value %>` to interpolate any values directly, i.e. inject them into the template without any modifications.
* Use `<%- value %>` to interpolate an HTML-escaped version of a given value. Use this if you’re generating an HTML file and you’re using unknown input data.

For more details and examples, see the [Lo-Dash’s API documentation for the `_.template()` method](http://lodash.com/docs#template).

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
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Jan Nicklas. Licensed under the MIT license.

This project contains parts of [grunt-template](https://github.com/mathiasbynens/grunt-template/)
grunt-template is available under the MIT license.
