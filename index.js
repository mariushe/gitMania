var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {}
handle["/"] = requestHandler.main;
handle["/second"] = requestHandler.second;
handle["/view/js/application.js"] = requestHandler.application;

server.start(router.route, handle);