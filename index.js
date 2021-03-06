var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {}

handle["/"] = requestHandler.git;
handle["/assets/js/application.js"] = requestHandler.application;
handle["/assets/js/jquery.tablesorter.min.js"] = requestHandler.tablesorter;
handle["/assets/js/git-controller.js"] = requestHandler.git_controller;
handle["/assets/css/application.css"] = requestHandler.css;
handle["/assets/css/bootstrap.min.css"] = requestHandler.bootstrap;
handle["/git"] = requestHandler.git;
handle["/git-data"] = requestHandler.gitLog;
handle["/git-show"] = requestHandler.gitShow;
handle["/my-branches"] = requestHandler.getBranchLabels;
handle["/get-branch-for-commit"] = requestHandler.getBranchForCommit;

server.start(router.route, handle);