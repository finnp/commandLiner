var assert = require('assert');
var Commandliner = require('./index.js');

describe('Commandliner', function() {

  it('should detect optional command argument', function () {
    var git = new Commandliner('git', 'status');
    assert.equal(git.command, 'status');
    assert.equal(git.program, 'git');
    var say = new Commandliner('say', {interactive: true});
    assert.ok(!say.command);
    assert.equal(say.program, 'say');
    assert.ok(say.options.interactive);
  });


  describe('toString', function () {
    it('should build a query properly', function() {
      var options = {
        'interactive': true,
        'v': 'Zarvox'
      };
      var say = new Commandliner('say', options);
      assert.equal(say.toString(), 'say --interactive -v Zarvox');
    });
    
    it('should append arguments to the end', function() {
      var jshint = new Commandliner('jshint', {'verboose': true}, ['index.js', 'test.js']);
      assert.equal(jshint + '', 'jshint --verboose index.js test.js');
    });
    
    it('should accept strings and wrap them nicely', function() {
      var options = {
        'interactive': true,
        'v': 'Zarvox'
      };
      var say = new Commandliner('say', options, 'Well, "helloo" Bye');
      assert.equal(say.toString(), 'say --interactive -v Zarvox \'Well, "helloo" Bye\'');
    });  
  
    it('should build command option', function () {
      var git = new Commandliner('git', {m: 'add tests'});
      git.command = 'commit';
      assert.equal(git.toString(), 'git commit -m \'add tests\'');
    });    
  });
  
  describe('build', function() {    
    it('should build a query from an ordered array', function () {
      var arr1 = ['docker', 'build', {t: 'something'}, 'testit'];
      var docker1 = Commandliner.build(arr1);
      assert.equal(docker1, 'docker build -t something testit');
      var arr2 = ['docker', 'run', 'randomName', '.'];
      var docker2 = Commandliner.build(arr2);
      assert.equal(docker2, 'docker run randomName .');
    });
  });
  
  describe('buildOptions', function () {
    it('should convert an object into a not escaped shell array', function () {
      var options = {
        'interactive': true,
        'v': 'Zarvox voice'
      };
      var opts = Commandliner.buildOptions(options);
      assert.deepEqual(opts, ['--interactive', '-v', 'Zarvox voice']);
    });
  });
  
  describe('buildOption', function () {
    it('should build a single option from key value', function () {
      var opt = Commandliner.buildOption('interactive', true);
      assert.deepEqual(opt, ['--interactive']);
      var opt = Commandliner.buildOption('interactive', false);
      assert.deepEqual(opt, []);
      var opt = Commandliner.buildOption('v', 'Zarvox');
      assert.deepEqual(opt, ['-v', 'Zarvox']);
      var opt = Commandliner.buildOption('voice', 'Zarvox');
      assert.deepEqual(opt, ['--voice=Zarvox']);
      
    });
  });
});