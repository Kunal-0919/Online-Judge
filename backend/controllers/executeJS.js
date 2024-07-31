const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

// Directory for compiled outputs
const dirOutputs = path.join(__dirname, "compiledOutputs");

if (!fs.existsSync(dirOutputs)) {
  fs.mkdirSync(dirOutputs, { recursive: true });
}

const executeJS = (filePath, inputPath) => {
  return new Promise((resolve, reject) => {
    // Read the input file
    fs.readFile(inputPath, "utf8", (err, input) => {
      if (err) return reject({ error: err, stderr: err.message });

      const child = exec(`node ${filePath}`, (error, stdout, stderr) => {
        if (error) return reject({ error, stderr });
        if (stderr) return reject({ error, stderr });
        resolve(stdout.trim());
      });

      // Write the input to the child process's stdin
      child.stdin.write(input);
      child.stdin.end();
    });
  });
};

module.exports = executeJS;
