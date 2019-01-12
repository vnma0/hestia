const http = require('http'), ip = require('ip');

var configParser = require("./configParser.js");
var proxyConfig = undefined, completed;

var func = undefined;

configParser((data) => {
    proxyConfig = data;
    // once we got the data,
    // fire up the proxy!
    bootstrap();
})

/**
 * @name bootstrap
 * @param {Function} func - function to execute when the server finishes initialization
 *                          and is ready to process requests
 */

var bootstrap = () => {
    var httpProxy = require('http-proxy').createProxyServer({});
    var server = http.createServer((req, res) => {
        httpProxy.web(req, res, {
            target: `http://${proxyConfig["destination"]["host"]}:${proxyConfig["destination"]["port"]}`
        })
    })
    server.listen(Number(proxyConfig["source"]["port"]))

    server.on('error', (err) =>  console.log(err))

    console.log(`Hestia proxy is now ready to relay HTTP requests.`);
    console.log(`If you're on the network, the proxy can be accessed at ${ip.address()}.`)
    console.log(`Listening on port ${proxyConfig["source"]["port"]} and forwarding to ${proxyConfig["destination"]["host"]}:${proxyConfig["destination"]["port"]}`)

    completed = true;

    if (!("hestia" in global)) 
        // construct global variable here if we don't do that already
        global.hestia = {};
    // set global port here so that other scripts can see
    global.hestia.proxy = {};
    global.hestia.proxy.port = Number(proxyConfig["source"]["port"]);

    if (typeof func === 'function')
        // if a function has been passed ('hook'), execute!
        func();
}

// hook to call when bootstrapping completed

module.exports = function (hook) {
    if (completed) 
        hook();
    else
        func = hook;
}