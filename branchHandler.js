var exec = require('child_process').exec;

function getBrancheForCommit(commit) {
	exec ("cd " + query.repository + "; git branch --contains " + commit, function (error, stdout, stderr) {
	 	var branch = stdout.substr(2);
	 	console.log("branch for commit: " + branch);

	 	return branch;
    });  
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

function createResponse(response, content) {
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(JSON.stringify(content));
    response.end();
}

exports.handleRequestForBranches = handleRequestForBranches;