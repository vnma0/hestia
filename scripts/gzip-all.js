const path = require('path');
const gzipAll = require('gzip-all');
var fs = require("fs");

var walkSync = function(dir, filelist = []) {
    for (let file of fs.readdirSync(dir)) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            walkSync(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    }
    return filelist;
};

var gzipper = walkSync(path.join(__dirname, "../build/"))
    .map(path => gzipAll(path));
Promise.all(gzipper).then(array => {
    console.log('Produced gzipped build ::\n');
    array.map(entry => console.log('  ', path.relative('.', entry[0])))
});
