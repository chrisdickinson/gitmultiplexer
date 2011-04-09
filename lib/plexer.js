var spawn = require('child_process').spawn;

var multiplex = function(remotes) {
  return function(stdin, stdout, stderr, original_command) {
    var subprocesses = remotes.map(function(remote) {
      return spawn('ssh', ['-c', original_command, remote]); 
    });

    subprocesses.forEach(function(proc) {
      stdin.on('data', proc.stdin.write.bind(proc.stdin));
      stdin.on('end', proc.stdin.close.bind(proc.stdin));
      proc.stdout.on('data', stdout.write.bind(stdout));
    });
  };
};

exports.multiplex = multiplex;
