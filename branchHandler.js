var exec = require('child_process').exec;

function createResponse(response, content) {
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(JSON.stringify(content));
    response.end();
}

function getBranchForCommit(query, response) {
	if (query.repository === undefined) {
		var child = exec ("git branch --contains " + query.commit, function (error, stdout, stderr) {

			if (stdout.indexOf("\n") != -1) {
				createResponse(response, { "branch": stdout.substr(2, stdout.indexOf("\n")-2)});
			} else {
				createResponse(response, { "branch": stdout.substr(2)});
			}
    	}); 
    } else {
        var child = exec ("cd " + query.repository + "; git branch --contains " + query.commit, function (error, stdout, stderr) {

        	if (stdout.indexOf("\n") != -1) {
				createResponse(response, { "branch": stdout.substr(2, stdout.indexOf("\n")-2)});
			} else {
				createResponse(response, { "branch": stdout.substr(2)});
			}
    	});
    }
	
}

function handleRequestForBranches(response, stdout) {
	
	var branches = stdout.split('\n');
	var generatedBranches = [];

    for (var i in branches) {

    	var branch = branches[i];
    	var labelClass = getLabels()[i];

		if (i == 0) {
        	branch= branches[i].substr(2);
        }

        if (branch == "") {
        	continue;
        }

        generatedBranches.push({	
        	branch : branch,
			labelClass : labelClass
        });
    }

    createResponse(response, generatedBranches);
}

function getLabels() {
	labels = [];
	labels[0] = "label";
	labels[1] = "label label-info";
	labels[2] = "label label-important";
	labels[3] = "label label-inverse";
	labels[4] = "label label-success";
	labels[5] = "label label-warning";

	return labels;
}



exports.handleRequestForBranches = handleRequestForBranches;
exports.getBranchForCommit = getBranchForCommit;