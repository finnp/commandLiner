var util = require('util');

var buildQuery = function(cmd, options, args) {
  var command = cmd;

  // Options
  if(options) {
    if(util.isArray(options)) {
      options.forEach(function(option) {
        command += ' --' + option;
      });
    } else {
      for(var key in options) {
        var value = options[key];
        if(value) {
          command += ' ';
          var isShortcut = key.length === 1;
          command += isShortcut ? '-' : '--';
          command += key;
          // How to properly test for stirngs?
          // this should also allow nubers i think
          if(util.isString(value) || util.Number(value)) {
            command += isShortcut ? ' ' : '=';
            command += value;
          }
        }
      }
    }
  }

  // Arguments
  if(args) {
    if(util.isArray(args)) {
      args.forEach(function(arg) {
        command += ' ' + arg;
      });
    } else {
      command += ' ' + args;
    }
  }
  return command;
};

module.exports = buildQuery;