const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

// Directory for compiled outputs
const dirOutputs = path.join(__dirname, "compiledOutputs");

if (!fs.existsSync(dirOutputs)) {
  fs.mkdirSync(dirOutputs, { recursive: true });
}

const executeCpp = (filePath, inputPath, timeout = 5000) => {
  const fileName = path.basename(filePath).split(".")[0];
  const outputFile = `${fileName}.out`;
  const outputPath = path.join(dirOutputs, outputFile);

  return new Promise((resolve, reject) => {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      return reject({ error: "Input file does not exist", stderr: "" });
    }

    const compileCommand = `g++ "${filePath}" -o "${outputPath}"`;

    exec(compileCommand, (compileError, compileStdout, compileStderr) => {
      if (compileError)
        return reject({ error: compileError, stderr: compileStderr });
      if (compileStderr)
        return reject({ error: compileError, stderr: compileStderr });

      const runCommand = `"${outputPath}" < "${inputPath}"`;
      exec(runCommand, { timeout }, (error, stdout, stderr) => {
        if (error) {
          if (error.signal === "SIGTERM") {
            return reject({ error: "Time Limit Exceeded", stderr: "" });
          }
          return reject({ error, stderr });
        }
        if (stderr) return reject({ error, stderr });
        resolve(stdout.trim());
      });
    });
  });
};

module.exports = executeCpp;
