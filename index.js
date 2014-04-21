var buildQuery = function(cmd, data) {
  var command = cmd;
  for(var key in data) {
    var value = data[key];
    if(value) {
      command += ' ';
      var isShortcut = key.length === 1;
      command += isShortcut ? '-' : '--';
      command += key;
      // How to properly test for stirngs?
      if(typeof value === 'string') {
        command += isShortcut ? ' ' : '=';
        command += value;
      }
    }
  }
  return command;
};

module.exports = buildQuery;