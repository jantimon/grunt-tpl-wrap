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

Wrap each file

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

Preprocess each file

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
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  tpl_wrap: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  tpl_wrap: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
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
