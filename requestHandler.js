var fs = require("fs");
var querystring = require("querystring");

function main(response) {
    var body = fs.readFileSync("assets/main.html");

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function application(response) {
    var body = fs.readFileSync("assets/js/application.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

function tablesorter(response) {
    var body = fs.readFileSync("assets/js/jquery.tablesorter.min.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

function css(response) {
    var body = fs.readFileSync("assets/css/application.css");

    response.writeHead(200, {"Content-Type":"text/css"})
    response.write(body);
    response.end();
}

function bootstrap(response) {
    var body = fs.readFileSync("assets/css/bootstrap.min.css");

    response.writeHead(200, {"Content-Type":"text/css"})
    response.write(body);
    response.end();
}

exports.main = main;
exports.application = application;
exports.tablesorter = tablesorter;
exports.css = css;
exports.bootstrap = bootstrap;