# commandLiner

[![Build Status](https://travis-ci.org/finnp/commandLiner.svg?branch=master)](https://travis-ci.org/finnp/commandLiner)

This is not another command option parser. It's the opposite. A command option builder for the use with exec. It will use
[shell-quote](https://github.com/substack/node-shell-quote) by substack to escape the options. 

## Example

```javascript
	var Commandliner = require('commandliner');
	var exec = require('child_process').exec;
	var say = new Commandliner('say', {interactive: true}, 'Hello, there!');
	say.options.voice = 'Zarvox';
	// Evaluates to: say --interactive -v Zarvox 'Hello, there!'
	exec(say); // implicit call to toString()
```

You can also just build the String directly like this.

```javascript
    var command = Commandliner.build(['git', 'commit', {m: 'Adds this new feature everyone loves'}]);
    // Evaluates to: git commit -m 'Add this new feature everyone loves'
    var command = Commandliner.build(['docker', 'run', 'something', '.']);
    // Evaluates to: docker run something .
```

## Attributes of new Commandliner()

| Attribute  |  Example |  Example value
| ------ | ------- | ------
| program | git   | `'git'`
| command | add | `'add'`
| options | -v -n | `{'v': true, 'n': true}`
| args | index.js test.js | `['index.js', 'test.js']`

Be aware of this since you could be thinking that "command" 
is the first argument, but I decided to call it program.