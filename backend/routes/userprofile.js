const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
const Problems = require("../models/problem"); // Import Problems model
const router = express.Router();

dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Unauthorized: No token provided");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized: Invalid token");
    req.user = decoded;
    next();
  });
};

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Count problems based on difficulty
    const easyCount = await Problems.countDocuments({ tag: "easy" });
    const mediumCount = await Problems.countDocuments({ tag: "medium" });
    const hardCount = await Problems.countDocuments({ tag: "hard" });

    // Send user data and problem counts in response
    res.json({
      user,
      problemStats: {
        easyCount,
        mediumCount,
        hardCount,
      },
    });
  } catch (error) {
    console.log("Error while requesting user: ", error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
