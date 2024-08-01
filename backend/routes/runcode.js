const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const generateFile = require("../controllers/generateFile");
const generateInputFile = require("../controllers/generateInputFile");
const executeCpp = require("../controllers/executeCpp");
const executePython = require("../controllers/executePython");
const executeJS = require("../controllers/executeJS");
const authenticateToken = require("../middlewares/authenticateToken");

// Middleware to verify token and extract user role
// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).send("Unauthorized: No token provided");

//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(401).send("Unauthorized: Invalid token");
//     req.user = decoded;
//     next();
//   });
// };

router.post("/run", authenticateToken, async (req, res) => {
  const { lang = "cpp", code, input } = req.body;
  if (!code) {
    return res.status(500).send("Empty Code");
  }

  try {
    const filePath = await generateFile(lang, code);
    const inputPath = await generateInputFile(input);
    let output;
    if (lang === "cpp") {
      output = await executeCpp(filePath, inputPath);
    } else if (lang == "py") {
      output = await executePython(filePath, inputPath);
    } else if (lang == "js") {
      output = await executeJS(filePath, inputPath);
    }

    res.json({
      message: "Success",
      filePath,
      output,
      inputPath,
    });
  } catch (error) {
    console.log("Error while running code: ", error.message);
    res.status(500).json({ error: "Server error", details: error });
  }
});

router.post("/submit", (req, res) => {});

module.exports = router;
