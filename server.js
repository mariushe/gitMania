var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {

    	var requestUrl = url.parse(request.url, true);
        var pathname = requestUrl.pathname;
        var query = requestUrl.query;

        console.log("Request received.");

        route(handle, pathname, query, response);
    }

    http.createServer(onRequest).listen(8080);

    console.log("Server has started.");
}

exports.start = start;

