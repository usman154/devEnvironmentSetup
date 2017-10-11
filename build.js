const exec = require('child_process').exec;
var _progress = require('cli-progress');
const fsE = require('fs-extra');
fsE.remove('newMicroService/src/app/baseApp', err => {
                     if (err) return console.error(err)
                      else console.log('\nDeleted base project!');
				   pb1 = new progresBar();
                   timer1 = new timer(pb1);
				  var ex = exec('cd newMicroService && gulp serve:dist', (error, stdout, stderr)=>{
					  console.log(`command closed with exit code ${code}  , error ${error} and stderr ${stderr}`);
	                 pb1.update(100);
                     pb1.stop();
                    clearInterval(timer);
				  });		
 
                    
                   });
 function progresBar(){
   var b1 = new _progress.Bar({format: 'Progress [{bar}] {percentage}% '}, _progress.Presets.shades_classic);
    b1.start(100, 0);
    return b1;
}
function timer(b1){
  var value = 0;
  var timer;
   timer = setInterval(function(){
      value++;
      b1.update(value)
      if(value > 100){
        value =0;
      }
  }, 30);
  return timer;
}
		   