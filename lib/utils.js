var fs = require('fs'),
    path = require('path');

var info = function(repo, callback) {
  fs.readFile(path.join('~/.multiplex', repo.replace(/\.git$/g)), function(err, data) {
    if(err) throw err;
    callback(JSON.parse(data.toString('utf8')));
  });
};
