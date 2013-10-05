var gitShowHandler = require("./gitShowHandler");
var gitBranchHandler = require("./branchHandler");
var gitLogHandler = require("./gitLogHandler");

var fs = require("fs");
var querystring = require("querystring");
var sys = require('sys')
var exec = require('child_process').exec;

function gitResponse(response, content) {
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(JSON.stringify(content));
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
    gitLogHandler.gitLog(query, response);
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

    if (query.repository === undefined || query.repository === "") {
        var child = exec ("git show " + query.commit, function (error, stdout, stderr) {
            gitShowHandler.generationShowJson(response, stdout);
        });
    } else {
       var child = exec ("cd " + query.repository + "; git show " + query.commit, function (error, stdout, stderr) {
            gitShowHandler.generationShowJson(response, stdout);
        });  
    }
}

function illegalState(response, errorMsg) {

    console.log("Error: " + errorMsg);

    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
}

function getBranchLabels(query, response) {
    exec ("cd " + query.repository + "; git branch", function (error, stdout, stderr) {
        gitBranchHandler.handleRequestForBranches(response,stdout);
    });
}

exports.application = application;
exports.tablesorter = tablesorter;
exports.git_controller = git_controller;
exports.css = css;
exports.bootstrap = bootstrap;
exports.gitLog = gitLog;
exports.git = git;
exports.gitShow = gitShow;
exports.getBranchLabels = getBranchLabels;
