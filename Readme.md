# commandLiner

[![Build Status](https://travis-ci.org/finnp/commandLiner.svg?branch=master)](https://travis-ci.org/finnp/commandLiner)

This is not another command option parser. It's the opposite. A command option builder for the use with exec.

## Example

```javascript
	var Commandliner = require('commandliner');
	var exec = require('child_process').exec;
	var say = new Commandliner('say', {interactive: true}, 'Hello, there!');
	say.options.voice = 'Zarvos';
	// Evaluates to: say --interactive -v Zarvox 'Hello, there!'
	exec(say); // implicit call to toString()
```

You can also just build the String directly like this.

```javascript
    var command = Commandliner.build(['git', 'commit', {m: 'Adds this new feature everyone loves'}]);
    // Evaluates to: git commit -m 'Add this new feature everyone loves'
```