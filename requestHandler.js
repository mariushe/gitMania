var fs = require("fs");
var querystring = require("querystring");

function main(response) {
    var body = fs.readFileSync("view/main.html");

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function second(response) {
    var body = fs.readFileSync("view/second.html");

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function application(response) {
    var body = fs.readFileSync("view/js/application.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

function tablesorter(response) {
    var body = fs.readFileSync("view/js/jquery.tablesorter.min.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

function css(response) {
    var body = fs.readFileSync("view/css/application.css");

    response.writeHead(200, {"Content-Type":"text/css"})
    response.write(body);
    response.end();
}

exports.main = main;
exports.second = second;
exports.application = application;
exports.tablesorter = tablesorter;
exports.css = css;