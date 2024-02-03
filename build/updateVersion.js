let fs = require('fs');
// get current values from version
let mainFile = 'version.json';
let recievedData = JSON.parse(fs.readFileSync(mainFile));

// add one to the build number and add current timestamp
recievedData.build = `${parseInt(recievedData.build.split('_')[0]) + 1}_${Math.floor(Date.now() / 1000)}`;

// write new values back to the version file
fs.writeFileSync(mainFile, JSON.stringify(recievedData, null, 2));
