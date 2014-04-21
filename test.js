var assert = require('assert');
var buildQuery = require('./index.js');

describe('buildCmd', function() {
  it('should build a query properly', function() {
    var options = {
      'interactive': true,
      'v': 'Zarvox'
    };
    var command = buildQuery('say', options);
    assert.equal(command, 'say --interactive -v Zarvox');
  });

  it('should append arguments to the end', function() {
    var command = buildQuery('jshint', ['verboose'], ['index.js', 'test.js']);
    assert.equal(command, 'jshint --verboose index.js test.js');
  });

  it('should accept strings and wrap them nicely', function() {
    var options = {
      'interactive': true,
      'v': 'Zarvox'
    };
    var command = buildQuery('say', options, 'Well, "helloo"Bye');
    assert.equal(command, 'say --interactive -v Zarvox "Well, \\"helloo\\"Bye"');
  });
});