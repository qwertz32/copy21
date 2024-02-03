let fs = require('fs');
let mainFile = 'version.json';
let recievedData = JSON.parse(fs.readFileSync(mainFile));
recievedData.build = `${parseInt(recievedData.build.split('_')[0]) + 1}_${Math.floor(Date.now() / 1000)}`;
fs.writeFileSync(mainFile, JSON.stringify(
    recievedData, null, 2));
