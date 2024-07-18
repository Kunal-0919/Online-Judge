const express = require("express");
const router = express.Router();
const Problem = require("../models/problem.js");
const jwt = require("jsonwebtoken");

router.post("/addproblem", async (req, res) => {
  try {
    const {
      problem_name,
      problem_desc,
      input_format,
      output_format,
      constraints,
      example_cases,
    } = req.body;

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    let role;
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      role = decoded.role;
    } catch (err) {
      return res.status(401).send("Unauthorized: Invalid token");
    }

    if (
      !(
        problem_name &&
        problem_desc &&
        input_format &&
        output_format &&
        constraints &&
        example_cases
      )
    ) {
      return res.status(400).send("Enter all the fields");
    }
    if (!(role === "admin" || role === "moderator")) {
      return res
        .status(403)
        .send(
          "You don't have the permission to add a problem, only a moderator or admin can do so"
        );
    }

    // Check if the problem name is already present
    const existingProblem = await Problem.findOne({ problem_name });
    if (existingProblem) {
      return res
        .status(400)
        .send("Problem Name Already Exists, Please change the name");
    }

    // Store the problem into the database
    const problem = await Problem.create({
      problem_name,
      problem_desc,
      input_format,
      output_format,
      constraints,
      example_cases,
      created_at: new Date(),
    });

    // Return success response
    return res.status(201).json({
      message: "Problem Added Successfully",
      success: true,
      problem,
    });
  } catch (error) {
    console.log("Error while adding problem, ", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/problems", async (req, res) => {
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
    console.log("Error while retrieving problems", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
