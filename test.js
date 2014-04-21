var assert = require('assert');
var buildQuery = require('./index.js');

describe('buildQuery', function() {
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
});