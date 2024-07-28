const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

// Directory for compiled outputs
const dirOutputs = path.join(__dirname, "compiledOutputs");

if (!fs.existsSync(dirOutputs)) {
  fs.mkdirSync(dirOutputs, { recursive: true });
}

const executeCpp = (filePath) => {
  const fileName = path.basename(filePath).split(".")[0];
  const outputFile = `${fileName}.out`;
  const outputPath = path.join(dirOutputs, outputFile); // Save to compiledOutputs directory

  return new Promise((resolve, reject) => {
    exec(
      `g++ "${filePath}" -o "${outputPath}" && "${outputPath}"`,
      (error, stdout, stderr) => {
        if (error) return reject({ error, stderr });
        if (stderr) return reject({ error, stderr });
        resolve(stdout.trim());
      }
    );
  });
};

module.exports = executeCpp;
