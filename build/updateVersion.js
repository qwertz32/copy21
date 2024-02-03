const fs = require('fs');

const file = 'version.json';
const receivedData = JSON.parse(fs.readFileSync(file));
const unix = Math.floor(Date.now() / 1000);

receivedData.build = `${unix}`;
fs.writeFileSync(file, JSON.stringify(receivedData, null, 2));
console.log(`Build updated to ${unix}`);
