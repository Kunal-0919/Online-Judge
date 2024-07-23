const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    // Validate input fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send("Enter all required information");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send("Profile already exists, please proceed to login");
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user in DB
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || "user", // Use provided role or default to "user"
      created_at: new Date(),
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", // true in production, false in development
      sameSite: "Strict",
      path: "/",
    });

    // Respond with success message, user details (without password), and token
    user.password = undefined; // Hide password from response
    res.status(201).json({
      message: "Successfully registered",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log("Error in registering: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).send("Enter all required information");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Incorrect Password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });

    user.password = undefined; // Hide password from response
    // Respond with success message, user details (without password), and token
    res.status(200).json({
      message: "Login Successful",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log("Error in login: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
