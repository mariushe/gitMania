var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {}

handle["/"] = requestHandler.main;
handle["/assets/js/application.js"] = requestHandler.application;
handle["/assets/js/jquery.tablesorter.min.js"] = requestHandler.tablesorter;
handle["/assets/css/application.css"] = requestHandler.css;
handle["/assets/css/bootstrap.min.css"] = requestHandler.bootstrap;
handle["/git"] = requestHandler.gitLog;

server.start(router.route, handle);