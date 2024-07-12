const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DBConnection } = require("./database/db.js");
const User = require("./models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

DBConnection();

app.get("/", (req, res) => {
  try {
    res.send("AlgoChef server");
  } catch (error) {
    console.log("Error on /: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

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
      role: "user", // Default role
      created_at: new Date(),
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
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

app.post("/login", async (req, res) => {
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
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Respond with success message, user details (without password), and token
    user.password = undefined; // Hide password from response
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
