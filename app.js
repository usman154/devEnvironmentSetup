const exec = require('child_process').exec;
var _progress = require('cli-progress');

const path = require('path');
const fs = require('fs');
const fsE = require('fs-extra')

var gitClone = "git clone";
var newMicroService = 'newMicroService';
var gulp = 'gulp';
var userName = process.argv[2];
if(!userName){
	console.log("User name is required.")
	return;
}
var pwd = process.argv[3];

var url = "https://"+userName+":"+pwd+"@bitbucket.org/expertflow-ondemand/ccadmin.git";


   console.log("Cloning repository..");
   var pb1 = new progresBar();
   var timer1 = new timer(pb1);
   exec(gitClone +' '+url  , (error,stdout,stderr)=>{

     if (error) {
       console.error(`\nError while cloning repository and error is : ${error}`);
       return;
     }
     pb1.update(100);
     pb1.stop();
	 clearInterval(timer);
     console.log("\nDone with cloning! ");
     console.log("\nRunning npm install..");
      pb1 = new progresBar();
      timer1 = new timer(pb1);
     exec('cls && cd ccadmin && npm install' , (error, stdout, stderr)=>{
       if (error) {
         console.error(`\nError while Running npm install, and error is : ${error}`);
		 
         return;
       }
        pb1.update(100);
        pb1.stop();
	    clearInterval(timer);
       console.log('\nNPM installed..');
       console.log('\nRunning Bower install');
	   pb1 = new progresBar();
       timer1 = new timer(pb1);
       exec('cls && cd ccadmin && bower install' , (error, stdout, stderr)=>{
         if (error) {
           console.error(`\nError while Running bower install, and error is : ${error}`);
		    
           return;
         }
          pb1.update(100);
          pb1.stop();
	      clearInterval(timer);
         console.log('\nBower installed..');
         console.log("\nRunning gulp serve:dist command.");
		  pb1 = new progresBar();
          timer1 = new timer(pb1);
      exec('cls && cd ccadmin && gulp serve:dist', (error, stdout, stderr)=>{
       if(error){
         console.error(`\nError while Running gulp serve:dist install, and error is : ${error}`);
		 
       }
            console.log("\nApplication built and minified files have been placed in dist folder under ccadmin directory");

             pb1.update(100);
             pb1.stop();
	         clearInterval(timer);
           ////
           fs.mkdir(newMicroService , function(){
             fsE.copySync(path.join(path.join(__dirname, 'ccadmin'), 'gulp'),path.join(path.join(__dirname, newMicroService) , gulp))
             fs.readFile(path.join(__dirname, 'ccadmin/gulpfile.js'),'utf8' , function(error, data){
               fs.writeFile(path.join(__dirname, newMicroService+'/gulpfile.js'), data, function(){
                 console.log("\nDone with gulpfile.js");
               });
             });
             fs.readFile(path.join(__dirname, 'ccadmin/package.json'),'utf8' , function(error, data){
               fs.writeFile(path.join(__dirname, newMicroService+'/package.json'), data, function(){
                 console.log("\nDone with Package.JSON file");
               });
             });
			 fs.readFile(path.join(__dirname, 'bower.json'),'utf8' , function(error, data){
               fs.writeFile(path.join(__dirname, newMicroService+'/bower.json'), data, function(){
                 console.log("\nDone with bower.JSON file");
               });
             });
             fs.mkdir(path.join(newMicroService,'src'), function(){
               fs.readFile(path.join(__dirname, 'ccadmin/src/index.html'),'utf8' , function(error, data){
                 fs.writeFile(path.join(__dirname, newMicroService+'/src/index.html'), data, function(){
                   console.log("\nCreated index.html file");
                 });
               });
               fs.mkdir(path.join(path.join(newMicroService,'src'),'app'), function(){
                 fs.readFile(path.join(__dirname, 'ccadmin/src/app/index.scss'),'utf8' , function(error, data){
                   fs.writeFile(path.join(__dirname, newMicroService+'/src/app/index.scss'), data, function(){
                     console.log("\nCreated index.scss file");
                   });
                 });
                 fs.mkdir(path.join(path.join(path.join(newMicroService,'src'),'app'), 'baseApp'), function(){
                   fsE.copySync(path.join(path.join(__dirname, 'ccadmin'), 'dist/scripts'),path.join(path.join(__dirname, newMicroService) , 'src/app/baseApp'));
                   fsE.copySync(path.join(path.join(__dirname, 'ccadmin'), 'dist/styles'),path.join(path.join(__dirname, newMicroService) , 'src/app/baseApp'));
				   fsE.copySync(path.join(path.join(__dirname, 'ccadmin'), 'dist/assets1'),path.join(path.join(__dirname, newMicroService) , 'src/app'));
                      var baseThings = [ 'translations', 'assets1','conf'];
				   for(var i=0; i<baseThings.length; i++){
					   var folder = baseThings[i];
					  fs.mkdirSync(path.join(path.join(newMicroService,'src'),folder))
						  fsE.copySync(path.join(path.join(__dirname, 'ccadmin'), 'dist/'+folder),path.join(path.join(__dirname, newMicroService) , 'src/'+folder));
					  }

				  
                   console.log("\nDone with copying base");
				   pb1.update(100);
                     pb1.stop();
                    clearInterval(timer);
                   pb1 = new progresBar();
                   timer1 = new timer(pb1);
                   fsE.remove('ccadmin', err => {
                     if (err) return console.error(err)
                     pb1.update(100);
                     pb1.stop();
                    clearInterval(timer);
                     console.log('\nDeleted base project!');
					  console.log('\Resolving dependencies for gulp in new microService!');
					  pb1 = new progresBar();
                      timer1 = new timer(pb1);
					 exec('cd newMicroService && npm install && bower install' , (error, stdout, stderr) =>{
						 if(error){
							  console.error(`\nError while Running npm install in newMicroService.. and error is : ${error}`);
							  return;
						 }
						 pb1.update(100);
                         pb1.stop();
                         clearInterval(timer);
						  console.log(`\nDone with everything. You can start developing your app now.`)
						 return;
					 });
					 
                    
                   });
                 });
               });
             });

           });


           ////
      });

       });
     });

return;
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
