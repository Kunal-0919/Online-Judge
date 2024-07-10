const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DBConnection } = require("./database/db.js");
const User = require("./models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; // Corrected logical OR operator

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

DBConnection();

app.get("/", (req, res) => {
  try {
    res.send("AlgoChef server");
  } catch (error) {
    console.log("Error on /: ", error);
  }
});

app.post("/register", async (req, res) => {
  try {
    // get all the data from the request body
    const { firstname, lastname, email, password } = req.body;

    // now we need to check that all the information is present
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send("Enter all the information");
    }

    // checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send("Profile already exists, Please head to login page");
    }

    // now we need to encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // save the user in the DB now after all this
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });
    // Now the registration part is done
    // Now we have just created the user we are going to directly allow access to home page
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
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
    res.status(500).send("Internal Server Error"); // Added response for error
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if complete information is there
    if (!email || !password) {
      return res.status(400).send("Enter all the information to login");
    }

    // now we need to check if the user exists
    // if does not exist tell to register
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    // else match password and generate token if expired
    const enteredPassword = await bcrypt.compare(password, user.password);
    if (!enteredPassword) {
      return res.status(401).send("Incorrect Password");
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
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
    res.status(500).send("Internal Server Error"); // Added response for error
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
