var build = require(__dirname + '/lib/build.js');
var t = require('typechecker');

function Commandliner(/* program, [command, ]options, args */) {
  this.program = arguments[0] || '' ;
  if(t.isString(arguments[1])) {
    this.command = arguments[1];
    this.options = arguments[2] || {};
    this.args = arguments[3];
  } else {
    this.command = null;
    this.options = arguments[1] || {};
    this.args = arguments[2];
  }
}  


Commandliner.build = build.build;
Commandliner.buildOptions = build.buildOptions;
Commandliner.buildOption = build.buildOption;

Commandliner.prototype.toString = function() {
  var fullCommand = [];
  if (this.program) fullCommand.push(this.program);
  if (this.command) fullCommand.push(this.command);
  if (this.options)  fullCommand.push(this.options);
  if (this.args)  fullCommand.push(this.args);
  
  return Commandliner.build(fullCommand);
};

module.exports = Commandliner;