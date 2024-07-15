const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DBConnection } = require("./database/db.js");
const User = require("./models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Problem = require("./models/problem.js");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const authMiddleware = require("./middleware/authMiddleware.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

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
      role: "admin",
      created_at: new Date(),
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email, role },
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

app.use(authMiddleware);

app.post("/addproblem", async (req, res) => {
  try {
    const {
      problem_name,
      problem_desc,
      input_format,
      output_format,
      constraints,
      example_cases,
      role,
    } = req.body;
    if (
      !(
        problem_name &&
        problem_desc &&
        input_format &&
        output_format &&
        constraints &&
        example_cases &&
        role
      )
    ) {
      return res.send("Enter all the fields").status(400);
    }
    if (!(role == "admin" || role == "moderator")) {
      res
        .status(400)
        .send(
          "You dont have the permission to add a problem, only a moderator or admin can do so"
        );
    }

    // now what we need is we need to first check if the problem name is already present
    const existingProblem = await Problem.findOne({ problem_name });
    if (existingProblem) {
      // problem name already exists
      res
        .status(400)
        .send("Problem Name Already Exists, Please change the name");
    }

    // now we need to store the problem into the database
    const problem = await Problem.create({
      problem_name,
      problem_desc,
      input_format,
      output_format,
      constraints,
      example_cases,
      created_at: new Date(),
    });
    // return
    res.status(201).json({
      message: "Problem Added Succesfully",
      success: true,
      problem,
    });
  } catch (error) {
    console.log("Error while adding problem, ", error);
  }
});

app.get("/problems", async (req, res) => {
  try {
    const problems = await Problem.find({});
    if (!problems) {
      return res.send("Problems Not Found").status(404);
    }

    return res.json({
      message: "Successfully retrieved problems",
      success: true,
      problems,
    });
  } catch (error) {
    console.log("error while retrieving problems", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
