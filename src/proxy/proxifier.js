var staticServe = function(req, res) {
    var resolvedBase = path.resolve(staticBasePath)
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '')
    var fileLoc = path.join(resolvedBase, safeSuffix)

    fs.readFile(fileLoc, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found')
            res.write('404: File Not Found!')
            return res.end()
        }

        res.statusCode = 200

        res.write(data)
        return res.end()
    })
}

const http = require('http'),
    ip = require('ip')

var configParser = require('./configParser.js')
var proxyConfig = undefined,
    completed

var func = undefined

configParser(data => {
    proxyConfig = data
    // once we got the data,
    // fire up the proxy!
    bootstrap()
})

/**
 * @name bootstrap
 * @param {Function} func - function to execute when the server finishes initialization
 *                          and is ready to process requests
 */

var bootstrap = () => {
    var httpProxy = require('http-proxy').createProxyServer({
        ssl: staticServe,
    })
    var server = http.createServer((req, res) => {
        httpProxy.web(req, res, {
            target: `http://${proxyConfig['destination']['host']}:${
                proxyConfig['destination']['port']
            }`,
        })
    })
    try {
        server.listen(Number(proxyConfig['source']['port']))
    } catch (error) {
        console.log(error)
    }

    server.on('error', err => console.log(err))

    console.log(`Hestia proxy is now ready to relay HTTP requests.`)
    console.log(
        `If you're on the network, the proxy can be accessed at ${ip.address()}.`
    )
    console.log(
        `Listening on port ${proxyConfig['source']['port']} and forwarding to ${
            proxyConfig['destination']['host']
        }:${proxyConfig['destination']['port']}`
    )

    completed = true

    if (!('hestia' in global))
        // construct global variable here if we don't do that already
        global.hestia = {}
    // set global port here so that other scripts can see
    global.hestia.proxy = {}
    global.hestia.proxy.port = Number(proxyConfig['source']['port'])

    if (typeof func === 'function')
        // if a function has been passed ('hook'), execute!
        func()
}

// hook to call when bootstrapping completed

module.exports = function(hook) {
    if (completed) hook()
    else func = hook
}
