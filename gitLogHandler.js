var exec = require('child_process').exec;

function createResponse(response, content) {
    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(JSON.stringify(content));
    response.end();
}

function generateResponse(query, response, commits) {

    var generated = [];

    function addCommitToList(hash, msg, branch) {

        if (hash == "") {
            createResponse(response, generated);
            return;
        }

        generated.push({
            "hash" : hash,
            "msg" : msg,
            "branch" : branch
        });

        handleACommit();
    }

    function addBranch(hash, msg) {

        exec ("cd " + query.repository + "; git branch --contains " + hash, function (error, stdout, stderr) {

            if (stdout.indexOf("\n") != -1) {
                addCommitToList(hash, msg, stdout.substr(2, stdout.indexOf("\n")-2));
            } else {
                addCommitToList(hash, msg, stdout.substr(2));
            }
        });
    }

    function handleACommit() {

        if (commits.length == 0) {
            createResponse(response, generated);
        }

        var commit = commits[0];

        commits.splice(0, 1);

        addBranch(commit.substr(0,commit.indexOf(' ')),commit.substr(commit.indexOf(' ') + 1));
    }

    handleACommit();
}

function gitLog(query, response) {

    if (query.repository === undefined) {
        exec ("git log --oneline", function (error, stdout, stderr) {

            generateResponse(query, response, stdout.split('\n')); 
        });
    } else {
        exec ("cd " + query.repository + "; git log --oneline", function (error, stdout, stderr) {

            generateResponse(query, response, stdout.split('\n'));  
        });
    }
}

exports.gitLog = gitLog;