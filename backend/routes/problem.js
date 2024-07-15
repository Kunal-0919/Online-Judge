const express = require("express");
const Problem = require("../models/problem.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.use(authMiddleware);

router.post("/addproblem", async (req, res) => {
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
      !problem_name ||
      !problem_desc ||
      !input_format ||
      !output_format ||
      !constraints ||
      !example_cases ||
      !role
    ) {
      return res.send("Enter all the fields").status(400);
    }

    if (!(role == "admin" || role == "moderator")) {
      return res
        .status(400)
        .send(
          "You dont have the permission to add a problem, only a moderator or admin can do so"
        );
    }

    const existingProblem = await Problem.findOne({ problem_name });
    if (existingProblem) {
      return res
        .status(400)
        .send("Problem Name Already Exists, Please change the name");
    }

    const problem = await Problem.create({
      problem_name,
      problem_desc,
      input_format,
      output_format,
      constraints,
      example_cases,
      created_at: new Date(),
    });

    res.status(201).json({
      message: "Problem Added Succesfully",
      success: true,
      problem,
    });
  } catch (error) {
    console.log("Error while adding problem, ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const problems = await Problem.find({});
    if (!problems) {
      return res.status(404).send("No Problems Found");
    }

    res.status(200).json({
      message: "All problems Retrieved",
      success: true,
      problems,
    });
  } catch (error) {
    console.log("Error while retrieving problems", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
