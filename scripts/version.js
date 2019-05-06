const fs = require('fs');
const { join } = require('path');
const child_process = require('child_process');
const os = require('os');

const hasbin = require('hasbin');

// check for pre-requisites
if (!hasbin.sync('git'))
    throw new Error('System requirement unsatisfied : Git is not found in $PATH!')

// load up the versioning tag
const HESTIA_GIT_COMMIT = child_process.execFileSync('git', 'rev-parse HEAD'.split(' '));
const HESTIA_GIT_BRANCH = child_process.execFileSync('git', 'symbolic-ref --short HEAD'.split(' '));
var HESTIA_GIT_TAG = '';
if (!(process.argv[2] === 'bypass-tag'))
    HESTIA_GIT_TAG = child_process.execFileSync('git', 'describe --exact-match --tags'.split(' '));
else 
    HESTIA_GIT_TAG = '<untagged release>'

const BUILD_INFO = `${os.userInfo().username}@${os.hostname()} [${os.cpus()[0].model}]`
const BUILD_TIME = new Date().toString()

// write to .env.production.local
var output = '';
output += `REACT_APP_HESTIA_GIT_COMMIT="${String(HESTIA_GIT_COMMIT).trim()}"\n`;
output += `REACT_APP_HESTIA_GIT_BRANCH="${String(HESTIA_GIT_BRANCH).trim()}"\n`;
output += `REACT_APP_HESTIA_GIT_TAG="${String(HESTIA_GIT_TAG).startsWith('fatal') ? 'null' : String(HESTIA_GIT_TAG).trim()}"\n`;
output += `REACT_APP_HESTIA_BUILD_INFO="${BUILD_INFO}"\n`
output += `REACT_APP_HESTIA_BUILD_TIME="${BUILD_TIME}"\n`

fs.writeFileSync(join(__dirname, '../.env.production.local'), output);
fs.writeFileSync(join(__dirname, '../.env.development.local'), output);