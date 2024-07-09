const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DBConnection } = requre("./database/db.js");
const User = require("./model/user.js");
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
const PORT = process.env.PORT | 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("AlgoChef server");
  } catch (error) {
    console.log("error on /: ", error);
  }
});

app.post("/register", async (req, res) => {
  try {
    // get all the data from the rqeuest body
    const { firstname, lastname, email, password } = req.body;

    // now we need to check that all the information is present
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send("Enter all the information");
    }
    // checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send("Profile exists, Please head to login page");
    }
    // now we need to encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save the user in the DB now after all this
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log("Error in registering : ", error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if complete information is there
    if (!email || !password) {
      return res.send("Enter all the information to login").status(400);
    }
    // now we need to check if the user exists
    // if does not exist tell to register
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User not found").status(401);
    }
    // else match password and generate token if expired
    const enteredPassword = await bcrypt.compare(password, user.password);
    if (!enteredPassword) {
      return res.send("Incorrect Password").status(401);
    }
  } catch (error) {
    console.log("Error in login : ", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
