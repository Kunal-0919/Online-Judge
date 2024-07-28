const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const generateFile = require("../controllers/generateFile");
const executeCpp = require("../controllers/executeCpp");

// Middleware to verify token and extract user role
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Unauthorized: No token provided");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized: Invalid token");
    req.user = decoded;
    next();
  });
};

router.post("/run", authenticateToken, async (req, res) => {
  const { lang = "cpp", code } = req.body;
  if (!code) {
    return res.status(500).send("Empty Code");
  }

  try {
    const filePath = await generateFile(lang, code);
    let output;
    if (lang === "cpp") {
      output = await executeCpp(filePath);
    }

    res.json({
      message: "Success",
      filePath,
      output,
    });
  } catch (error) {
    console.log("Error while running code: ", error.message);
    res.status(500).json({ error: "Server error", details: error });
  }
});

module.exports = router;