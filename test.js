const exec = require('child_process').exec;

var out = exec('git clone https://muhammad_usman_rana:hackman123@bitbucket.org/expertflow-ondemand/webcallback.git --progress');
out.stderr.on('data', function(data){
	console.log(data);
});