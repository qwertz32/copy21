const fs = require('fs');
const file = 'version.json';
const recievedData = JSON.parse(fs.readFileSync(file));
const currentBuildNumber = parseInt(recievedData.build.split('_')[0]);
recievedData.build = `${currentBuildNumber + 1}_${Math.floor(Date.now() / 1000)}`;
fs.writeFileSync(file, JSON.stringify(recievedData, null, 2));