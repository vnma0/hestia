const path = require('path');
const gzipAll = require('gzip-all');
var fs = require("fs");

var walkSync = function(dir, filelist = []) {
    if (dir[dir.length - 1] != path.sep) dir = dir.concat(path.sep);

    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
        let name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            filelist = walkSync(name + path.sep, filelist);
        } else {
            filelist.push(name);
        }
    });
    return filelist;
};

var gzipper = walkSync(path.join(__dirname, "../build/"))
    .map(path => gzipAll(path));
Promise.all(gzipper).then(array => {
    console.log('Produced gzipped build ::\n');
    array.map(entry => console.log('  ', path.relative('.', entry[0])))
});



