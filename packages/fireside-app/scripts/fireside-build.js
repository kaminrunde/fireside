#!/usr/bin/env node
const { exec } = require('child_process')
const [,,cmd,...args] = process.argv

exec(__dirname+'/fireside-build.sh '+process.cwd(), 
(error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error !== null) {
      console.log(`exec error: ${error}`);
  }
})