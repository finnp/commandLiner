# commandLiner

This is not another command option parser. It's the opposite. A command option builder for the use with exec.

## Example

```javascript
	var cmdliner = require('commandliner');
    var command = cmdliner('say', {interactive: true, v: 'Zarvos'});
    // Evaluates to: say --interactive -v Zarvox
```