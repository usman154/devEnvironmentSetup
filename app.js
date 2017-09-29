const exec = require('child_process').exec;
var _progress = require('cli-progress');

const path = require('path');
const fs = require('fs');
const fsE = require('fs-extra')

var gitClone = "git clone";
var newMicroService = 'newMicroService';
var gulp = 'gulp';
var url = "https://muhammad_usman_rana:hackman123@bitbucket.org/expertflow-ondemand/ccadmin.git";


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
         console.error(`Error while Running gulp serve:dist install, and error is : ${error}`);
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
                 console.log("Done with gulpfile.js");
               });
             });
             fs.readFile(path.join(__dirname, 'ccadmin/package.json'),'utf8' , function(error, data){
               fs.writeFile(path.join(__dirname, newMicroService+'/package.json'), data, function(){
                 console.log("Done with Package.JSON file");
               });
             });
             fs.mkdir(path.join(newMicroService,'src'), function(){
               fs.readFile(path.join(__dirname, 'ccadmin/src/index.html'),'utf8' , function(error, data){
                 fs.writeFile(path.join(__dirname, newMicroService+'/src/index.html'), data, function(){
                   console.log("Created index.html file");
                 });
               });
               fs.mkdir(path.join(path.join(newMicroService,'src'),'app'), function(){
                 fs.readFile(path.join(__dirname, 'ccadmin/src/app/index.scss'),'utf8' , function(error, data){
                   fs.writeFile(path.join(__dirname, newMicroService+'/src/app/index.scss'), data, function(){
                     console.log("Created index.scss file");
                   });
                 });
                 fs.mkdir(path.join(path.join(path.join(newMicroService,'src'),'app'), 'baseApp'), function(){
                   fsE.copySync(path.join(path.join(__dirname, 'ccadmin'), 'dist'),path.join(path.join(__dirname, newMicroService) , 'src/app/baseApp'))
                   console.log("Done with copying base");
                   pb1 = new progresBar();
                   timer1 = new timer(pb1);
                   fsE.remove('ccadmin', err => {
                     if (err) return console.error(err)
                     pb1.update(100);
                     pb1.stop();
                    clearInterval(timer);
                     console.log('Deleted base project!');
                     return;
                   })
                 });
               });
             });

           });


           ////
      });

       });
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
