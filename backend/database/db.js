const mognoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DBConnection = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mognoose.connect(MONGO_URI);
    console.log("DB connection established");
  } catch (error) {
    console.log("DB Connection Error : ", error);
  }
};

module.exports = { DBConnection }; // DBConnection should be in curly braces => Dynamic Export/Import
