'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.tpl_wrap = {
  default_options: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default-options');
    var expected = grunt.file.read('test/expected/default-options');
    test.equal(actual, expected, 'should wrap all files into one file.');

    test.done();
  },
  custom_options: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/prepare');
    var expected = grunt.file.read('test/expected/prepare');
    test.equal(actual, expected, 'should allow to extend the data with custom values.');

    test.done();
  },
  expandFiles1: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/demo1.expand.html');
    var expected = grunt.file.read('test/expected/demo1.expand.html');
    test.equal(actual, expected, 'should wrap each file if the expand flag is set to true. - file 1');

    test.done();
  },
  expandFiles2: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/demo2.expand.html');
    var expected = grunt.file.read('test/expected/demo2.expand.html');
    test.equal(actual, expected, 'should wrap each file if the expand flag is set to true. - file 2');

    test.done();
  }
};
