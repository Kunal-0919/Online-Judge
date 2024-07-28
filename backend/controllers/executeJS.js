const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

// Directory for compiled outputs
const dirOutputs = path.join(__dirname, "compiledOutputs");

if (!fs.existsSync(dirOutputs)) {
  fs.mkdirSync(dirOutputs, { recursive: true });
}

const executeJS = (filePath) => {
  // we need to starightforward return the outputs
  return new Promise((resolve, reject) => {
    exec(`node ${filePath}`, (error, stdout, stderr) => {
      if (error) return reject({ error, stderr });
      if (stderr) return reject({ error, stderr });
      resolve(stdout.trim());
    });
  });
};

module.exports = executeJS;
