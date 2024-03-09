const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
    const directoryPath = "./"; // default to current directory
    const files = fs.readdirSync(directoryPath);
    return {
        statusCode: 200,
        body: JSON.stringify({ files }),
    };
};
