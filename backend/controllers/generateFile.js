const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");

const dirCodes = path.join(__dirname, "usercodes");
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (lang, code) => {
  const jobid = uuid();
  const file_name = `${jobid}.${lang}`;

  const filePath = path.join(dirCodes, file_name);
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, code);
  else generateFile(lang, code);
  return filePath;
};

module.exports = generateFile;
