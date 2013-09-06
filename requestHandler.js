var fs = require("fs");
var querystring = require("querystring");

function main(response) {
    console.log("Request handler 'start' was called.");

    var body = fs.readFileSync("view/main.html");

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function second(response) {
    console.log("Request handler 'start' was called.");

    var body = fs.readFileSync("view/second.html");

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function application(response) {
    console.log("Request handler 'start' was called.");

    var body = fs.readFileSync("view/js/application.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

exports.main = main;
exports.second = second;
exports.application = application;
