var t = require('typechecker');

var buildcmd = function(cmd, options, args) {
  var cmdString = cmd;

  if(options) {
    cmdString += buildOptions(options);
  }

  // Arguments
  if(args) {
    if(t.isArray(args)) {
      args.forEach(function(arg) {
        cmdString += ' ' + arg;
      });
    } else if(t.isString(args)) {
      args = args.replace(/"/g, '\\"').replace(/'/g, "\\'");
      cmdString += ' "' + args + '"';
    }
  }
  return cmdString;
};

// Otions like: 
// --verboose
// --reporter=Test
// -h 
var buildOptions = function(options) {
  var cmdOptions = '';
  if(t.isArray(options)) {
    options.forEach(function(option) {
      cmdOptions += ' --' + option;
    });
  } else {
    for(var key in options) {
      cmdOptions += buildOption(key, options[key]);
    }
  }
  return cmdOptions;
};

// Build a single option
var buildOption = function(key, value) {
  var option = '';
  if(value) {
    option += ' ';
    var isShortcut = key.length === 1;
    option += isShortcut ? '-' : '--';
    option += key;
    if(t.isString(value) || t.isNumber(value)) {
      option += isShortcut ? ' ' : '=';
      option += value;
    }
  }
  return option;
};

module.exports = buildcmd;