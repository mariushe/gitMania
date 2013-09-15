function gitResponse(response, content) {
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(JSON.stringify(content));
    response.end();
}

function generationShowJson(response, stdout) {
    var rawData = stdout.split('\n');
    var generated = {
        "hash" : rawData[0].substr(rawData[0].indexOf(' ') + 1),
        "author" : rawData[1].substr(rawData[1].indexOf(' ') + 1)
    };

    gitResponse(response, generated);
}

exports.generationShowJson = generationShowJson;
