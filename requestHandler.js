var fs = require("fs");
var querystring = require("querystring");
var sys = require('sys')
var exec = require('child_process').exec;

function gitResponse(response, content) {
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(JSON.stringify(content));
    response.end();
}

function generateGitJson(response, stdout) {
    var generated = {
        commits: []
    }
    var rawCommits = stdout.split('\n');
    for (var i in rawCommits) {
        var commit = rawCommits[i];
        generated.commits.push({
            "hash" : commit.substr(0,commit.indexOf(' ')),
            "msg" : commit.substr(commit.indexOf(' ') + 1)
        });
    }
    gitResponse(response, generated);
}

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

function gitLog(response) {
    var child = exec ("git log --oneline", function (error, stdout, stderr) {
       generateGitJson(response, stdout);
    });
}



exports.main = main;
exports.application = application;
exports.tablesorter = tablesorter;
exports.css = css;
exports.bootstrap = bootstrap;
exports.gitLog = gitLog;