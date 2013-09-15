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
    var generated = [];
    var rawCommits = stdout.split('\n');
    for (var i in rawCommits) {
        var commit = rawCommits[i];
        generated.push({
            "hash" : commit.substr(0,commit.indexOf(' ')),
            "msg" : commit.substr(commit.indexOf(' ') + 1)
        });
    }
    gitResponse(response, generated);
}

function generationShowJson(response, stdout) {
    var rawData = stdout.split('\n');
    var generated = {"hash" : rawData[0]};
    gitResponse(response, generated);

}

function main(query, response) {
    var body = fs.readFileSync("assets/main.html");

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function application(query, response) {
    var body = fs.readFileSync("assets/js/application.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

function tablesorter(query, response) {
    var body = fs.readFileSync("assets/js/jquery.tablesorter.min.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

function git_controller(query, response) {
    var body = fs.readFileSync("assets/js/git-controller.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

function css(query, response) {
    var body = fs.readFileSync("assets/css/application.css");

    response.writeHead(200, {"Content-Type":"text/css"})
    response.write(body);
    response.end();
}

function bootstrap(query, response) {
    var body = fs.readFileSync("assets/css/bootstrap.min.css");

    response.writeHead(200, {"Content-Type":"text/css"})
    response.write(body);
    response.end();
}

function gitLog(query, response) {
    var child = exec ("git log --oneline", function (error, stdout, stderr) {
       generateGitJson(response, stdout);
    });
}

function git(query, response) {
    var body = fs.readFileSync("assets/git.html");

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function gitShow(query, response) {
    if (query.commit === undefined) {
        illegalState(response, "Parameter isn't sent with request");
        return
    }

    var child = exec ("git show " + query.commit, function (error, stdout, stderr) {
        generationShowJson(response, stdout);
    });
}

function illegalState(response, errorMsg) {

        console.log("Error: " + errorMsg);

        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
}


exports.main = main;
exports.application = application;
exports.tablesorter = tablesorter;
exports.git_controller = git_controller;
exports.css = css;
exports.bootstrap = bootstrap;
exports.gitLog = gitLog;
exports.git = git;
exports.gitShow = gitShow;