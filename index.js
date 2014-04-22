var buildcmd = require(__dirname + '/lib/buildcmd.js');

function Commandliner(cmd, options, args) {
  this.cmd = cmd || '' ;
  this.options = options || {};
  this.args = args || {};
}

Commandliner.build = buildcmd;

Commandliner.prototype.toString = function() {
  return buildcmd(this.cmd, this.options, this.args);
};

module.exports = Commandliner;