const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send("Enter all required information");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send("Profile already exists, please proceed to login");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: "user",
      created_at: new Date(),
    });

    const token = jwt.sign(
      { id: user._id, email, role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    user.password = undefined;
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Enter all required information");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Incorrect Password");
    }

    const token = jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    user.password = undefined;
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
