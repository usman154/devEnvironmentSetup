const exec = require('child_process').exec;
const fsE = require('fs-extra');
fsE.remove('newMicroService/src/app/baseApp', err => {
                     if (err) return console.error(err)
                      else console.log('\nDeleted base project!');
				  
				  var ex = exec('cd newMicroService && gulp serve:dist');		
ex.on('close', function(code){
	console.log(`command closed with exit code ${code}`)
});
                    
                   });
		   