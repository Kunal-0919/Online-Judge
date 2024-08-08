const express = require("express");
const router = express.Router();
const Problem = require("../models/problem.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/authenticateToken.js");
const mongoose = require("mongoose");
// Middleware to verify token and extract user role
// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).send("Unauthorized: No token provided");

//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(401).send("Unauthorized: Invalid token");
//     req.user = decoded;
//     next();
//   });
// };

// Add problem route

router.post("/addproblem", authenticateToken, async (req, res) => {
  try {
    const {
      problem_name,
      problem_desc,
      input_format,
      output_format,
      constraints,
      example_cases,
      tag,
      topic_tags,
      hidden_cases,
    } = req.body;
    console.log(req.body);
    if (
      !(
        problem_name &&
        problem_desc &&
        input_format &&
        output_format &&
        constraints &&
        example_cases &&
        tag &&
        hidden_cases
      )
    ) {
      return res.status(400).send("Enter all the fields");
    }

    if (!(req.user.role === "admin" || req.user.role === "moderator")) {
      return res
        .status(403)
        .send(
          "You don't have the permission to add a problem, only a moderator or admin can do so"
        );
    }

    // Check if the problem name already exists
    const existingProblem = await Problem.findOne({ problem_name });
    if (existingProblem) {
      return res
        .status(400)
        .send("Problem Name Already Exists, Please change the name");
    }

    // Create and store the new problem
    const problem = await Problem.create({
      problem_name,
      problem_desc,
      input_format,
      output_format,
      constraints,
      example_cases,
      tag,
      topic_tags,
      created_at: new Date(),
      hidden_cases,
    });

    // Respond with success
    return res.status(201).json({
      message: "Problem Added Successfully",
      success: true,
      problem,
    });
  } catch (error) {
    console.log("Error while adding problem:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Get all problems route
router.get("/problems", async (req, res) => {
  try {
    // Extract the pageCount from the query parameters
    const page = parseInt(req.query.page) || 1; // Default to 1 if not provided
    const pageCount = 3; // Fixed number of problems to display per page

    // Calculate the number of items to skip
    const skip = (page - 1) * pageCount;
    const allproblems = await Problem.find({});
    const problemsCount = allproblems.length;
    // Find problems with pagination
    const problems = await Problem.find({}).skip(skip).limit(pageCount);

    // If no problems are found
    if (!problems || problems.length === 0) {
      return res.status(404).send("Problems Not Found");
    }

    // Send response with retrieved problems
    return res.json({
      message: "Successfully retrieved problems",
      success: true,
      problems,
      problemsCount,
      currentPage: page,
      pageSize: pageCount,
    });
  } catch (error) {
    console.log("Error while retrieving problems", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE request to delete a problem by ID
router.delete("/delete/:problem_id", authenticateToken, async (req, res) => {
  try {
    const problem_id = req.params.problem_id; // Extract problem_id from URL params
    console.log(problem_id);
    // Validate problem_id if necessary
    if (req.user.role != "admin") {
      return res
        .status(403)
        .send(
          "You don't have the permission to delete a problem, only a moderator or admin can do so"
        );
    }
    const result = await Problem.findByIdAndDelete(problem_id);
    if (!result) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const users = await User.find({});
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.problems_solved.includes(problem_id)) {
        user.problems_solved = user.problems_solved.filter(
          (id) => id !== problem_id
        );
        user.problems_solved_count = user.problems_solved.length;
        await user.save();
      }
    }

    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    console.log("Error while deleting problem", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get problem details by ID route
router.get("/:problem_id", async (req, res) => {
  try {
    const problem_id = req.params.problem_id; // Extract problem_id from URL params

    // Fetch problem details from the database
    const problem = await Problem.findById(problem_id).select("-hidden_cases");
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({
      message: "Successfully retrieved problem details",
      success: true,
      problem,
    });
  } catch (error) {
    console.log("Error while retrieving problem details", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
