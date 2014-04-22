var assert = require('assert');
var Commandliner = require('./index.js');

describe('Commandliner', function() {
  it('should build a query properly', function() {
    var options = {
      'interactive': true,
      'v': 'Zarvox'
    };
    var say = new Commandliner('say', options);
    assert.equal(say.toString(), 'say --interactive -v Zarvox');
  });

  it('should append arguments to the end', function() {
    var jshint = new Commandliner('jshint', ['verboose'], ['index.js', 'test.js']);
    assert.equal(jshint + '', 'jshint --verboose index.js test.js');
  });

  it('should accept strings and wrap them nicely', function() {
    var options = {
      'interactive': true,
      'v': 'Zarvox'
    };
    var say = new Commandliner('say', options, 'Well, "helloo"Bye');
    assert.equal(say.toString(), 'say --interactive -v Zarvox "Well, \\"helloo\\"Bye"');
  });

  describe('build', function() {
    it('should build a query', function() {
      var options = {
        'interactive': true,
        'v': 'Zarvox'
      };
      var sayString = Commandliner.build('say', options);
      assert.equal(sayString, 'say --interactive -v Zarvox');
    });
  });
});