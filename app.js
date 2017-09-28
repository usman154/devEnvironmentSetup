var nodegit = require('nodegit'),
    path = require('path');

var url = "https://muhammad_usman_rana:hackman123@bitbucket.org/expertflow-ondemand/ccadmin.git";
  var  local = "./baseApp";
  var userName = "muhammad.usman@expertflow.com";
  var password = "hackman123!"
    var cloneOpts = {

  };
console.log("Cloning..");
nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
}).catch(function (err) {
    console.log(err);
});
