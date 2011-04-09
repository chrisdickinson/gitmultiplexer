var spawn = require('child_process').spawn;

var multiplex = function(remotes) {
  return function(stdin, stdout, stderr, original_command) {
    var subprocesses = remotes.map(function(remote) {
      var repo = (/:(.*)$/g)(remote)[1];
      remote = remote.replace(':'+repo, '');

      console.error('spawning '+remote+'...');
      var proc = spawn('ssh', [remote, '-C', original_command.replace(/'(.*?)'/g, "'"+repo+"'")]);
      proc.name = remote;
      return proc; 
    });

    var end = function(name, fn) {
      return function() {
        subprocesses.pop();
        console.error('closing '+name+', waiting on '+subprocesses.length+' more process(es)');
        fn();
      };
    };

    subprocesses.forEach(function(proc) {
      stdin.on('data', proc.stdin.write.bind(proc.stdin));
      stdin.on('end', end(proc.name, proc.stdin.end.bind(proc.stdin)));
      proc.stdout.on('data', function(data) {
        stdout.write(data);
      });

      proc.on('exit', function() {
        console.error('exiting from '+proc.name);
      });
    });

    stdin.resume();
  };
};

exports.multiplex = multiplex;
