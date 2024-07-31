const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirInputs = path.join(__dirname, "inputs");
if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
  const jobid = uuid();
  const input_filename = `${jobid}.txt`;
  const input_filepath = path.join(dirInputs, input_filename);
  await fs.writeFileSync(input_filepath, input);
  return input_filepath;
};
module.exports = generateInputFile;
