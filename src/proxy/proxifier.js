const http = require('http');

var configParser = require("./configParser.js");
var config = undefined;

configParser((data) => {
    config = data;
    // once we got the data,
    // fire up the proxy!
    bootstrap();
})

var bootstrap = () => {
    var httpProxy = require('http-proxy').createProxyServer({});
    var server = http.createServer((req, res) => {
        httpProxy.web(req, res, {
            target: `http://${config["destination"]["host"]}:${config["destination"]["port"]}`
        })
    })
    server.listen(Number(config["source"]["port"]))
    console.log(`Hestia proxy is now listening on port ${config["source"]["port"]} and ready to relay requests`);
}