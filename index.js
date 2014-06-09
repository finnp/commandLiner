var t = require('typechecker');
var quote = require('shell-quote').quote

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

Commandliner.buildOption = function (key, value) {
  var option = [];
  if(value) {
    var isShortcut = key.length === 1;
    option[0] = isShortcut ? '-' : '--';
    option[0] += key;
    
    if(t.isString(value) || t.isNumber(value)) {
      if(!isShortcut) {
        // e.g. --interactive=yes
        option[0] += '=' + value;
      } else {
        // e.g. -i a
        option[1] = value;
      }
    }
  }
  return option;
};

Commandliner.buildOptions = function (options) {
  var cmdOptions = [];
  if(t.isArray(options)) {
    options.forEach(function(option) {
      cmdOptions.push('--' + option);
    });
  } else {
    for(var key in options) {
      cmdOptions = cmdOptions.concat(Commandliner.buildOption(key, options[key]));
    }
  }
  return cmdOptions;
};

Commandliner.build = function (args) {
  var cmd = [];
  args.forEach(function (argument, index) {
    if(t.isPlainObject(argument)) {
      cmd = cmd.concat(Commandliner.buildOptions(argument));
    } else if(t.isArray(argument)) {
      cmd = cmd.concat(argument);
    } else {
      cmd.push(argument);
    }
  });
  
  cmd = quote(cmd);
  return cmd;
};

Commandliner.prototype.toString = function() {
  var fullCommand = [];
  if (this.program) fullCommand.push(this.program);
  if (this.command) fullCommand.push(this.command);
  if (this.options)  fullCommand.push(this.options);
  if (this.args)  fullCommand.push(this.args);
  
  return Commandliner.build(fullCommand);
};

module.exports = Commandliner;