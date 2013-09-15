function gitResponse(response, content) {
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(JSON.stringify(content));
    response.end();
}

function generationShowJson(response, stdout) {
	stdout = stdout.split('<').join('&lt;').split('>').join('&gt;');
    var rawData = stdout.split('\n');
    var generated = {
        "hash" : rawData[0].substr(rawData[0].indexOf(' ') + 1),
        "author" : rawData[1].substr(rawData[1].indexOf(' ') + 1),
        "date" :  rawData[2].substr(rawData[2].indexOf(' ') + 1),
        "msg" :  rawData[4].substr(rawData[4].indexOf(' ') + 1).trim(),
        "diff" : []
    };
    runThroughDifference(rawData, generated);
    gitResponse(response, generated);
}

function runThroughDifference(rawData, generated) {
	for (var i = 5; i < rawData.length; i++) {
		if (rawData[i].indexOf("diff") == 0) {
			generated.diff.push({
				"filename" : getFilename(rawData[i]),
				"lines" : getChanges(i, rawData)
			});

		console.log(getFilename(rawData[i]));	

		}
		
    }
}

function getChanges(index, rawData) {
	for (var i = index; i < rawData.length; i++) {
		if (rawData[i].indexOf("@@") == 0) {
			return fetchLinesThatAreChanged(i+1, rawData);
			console.log(getFilename(rawData[i]));	
		}
    }
}

function fetchLinesThatAreChanged(index, rawData) {

	lines = [];

	for (var i = index; i < rawData.length; i++) {

		if (rawData[i].indexOf("diff") == 0 || rawData[i].indexOf("\\") == 0) {
			return lines;
		}

		lines.push({"line" : rawData[i]});
    }

    return lines;
}

function getFilename(lineToParse) {
	result = lineToParse.substr(lineToParse.indexOf("--git a/") + 8);
	result = result.substr(0, result.indexOf(" b/"));
	return result;
}

exports.generationShowJson = generationShowJson;
