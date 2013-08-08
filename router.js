/**
 * Created with IntelliJ IDEA.
 * User: mariusherring
 * Date: 3/24/13
 * Time: 7:52 PM
 * To change this template use File | Settings | File Templates.
 */
function route(handle, pathname, response, postData) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, postData);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
