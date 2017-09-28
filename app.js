const exec = require('child_process').exec;
var _progress = require('cli-progress');
var gitClone = "git clone";
var url = "https://muhammad_usman_rana:hackman123@bitbucket.org/expertflow-ondemand/ccadmin.git";
var timer  ;
   exec(gitClone +' '+url +'&& cd ccadmin && npm install && bower install', (a,b,c)=>{
     clearInterval(timer);
     b1.update(200)
        b1.stop();
   });
   var b1 = new _progress.Bar({
    barCompleteChar: '=',
    barIncompleteChar: '.',
    fps: 5,
    stream: process.stdout,
    barsize: 60
});

    b1.start(200, 0);
    var value = 0;
     timer = setInterval(function(){
        value++;
        b1.update(value)
        if(value > 200){
          value =0;
        }
    }, 20);
