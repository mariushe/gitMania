/**
 * Created with IntelliJ IDEA.
 * User: mariusherring
 * Date: 3/24/13
 * Time: 7:42 PM
 * To change this template use File | Settings | File Templates.
 */
var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {}
handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;

server.start(router.route, handle);