const exec = require('child_process').exec;
const fsE = require('fs-extra');
fsE.remove('ccadmin/baseApp', err => {
                     if (err) return console.error(err)
                      else console.log('\nDeleted base project!');
                     return;
                   });
exec('cd ccadmin && gulp serve:dist')				   