const http = require('http'),
    server = http.createServer();

var configParser = require("./configParser.js");
var config = undefined;

configParser((data) => {
    config = data;
    // once we got the data,
    // fire up the proxy!
    bootstrap();
})

var bootstrap = () => {
    server.listen(Number(config["source"]["port"]));
    server.on('request', (request, response) => {
        let buffer = http.request({
            host : `${config["destination"]["host"]}`,
            port : Number(config["destination"]["port"]),
            method : request.method,
            headers : request.headers,
            auth : request.auth
        }, (res) => res.pipe(response));
        request.pipe(buffer);
    });
    console.log(`Server listening on port ${Number(config["source"]["port"])},
        ready to proxy requests to ${config["destination"]["host"]}:${config["destination"]["port"]}`);
}