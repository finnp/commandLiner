var t = require('typechecker');
var escape = require('shell-quote').quote

function build(args) {
  var cmd = [];
  args.forEach(function (argument, index) {
    if(t.isPlainObject(argument)) {
      cmd = cmd.concat(buildOptions(argument));
    } else if(t.isArray(argument)) {
      cmd = cmd.concat(argument);
    } else {
      cmd.push(argument);
    }
  });
  
  cmd = escape(cmd);
  return cmd;
};

// Options like: 
// --verboose
// --reporter=Test
// -h 
function buildOptions(options) {
  var cmdOptions = [];
  if(t.isArray(options)) {
    options.forEach(function(option) {
      cmdOptions.push('--' + option);
    });
  } else {
    for(var key in options) {
      cmdOptions = cmdOptions.concat(buildOption(key, options[key]));
    }
  }
  return cmdOptions;
};

// Build a single option
function buildOption(key, value) {
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

exports.build = build;
exports.buildOptions = buildOptions;
exports.buildOption = buildOption;