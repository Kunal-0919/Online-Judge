const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Problem = require("../models/problem.js");
const User = require("../models/user.js");
const generateFile = require("../controllers/generateFile");
const generateInputFile = require("../controllers/generateInputFile");
const executeCpp = require("../controllers/executeCpp");
const executePython = require("../controllers/executePython");
const executeJS = require("../controllers/executeJS");
const authenticateToken = require("../middlewares/authenticateToken");

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

router.post("/run", authenticateToken, async (req, res) => {
  const { lang = "cpp", code, input } = req.body;
  if (!code) {
    return res.status(500).send("Empty Code");
  }
  if (!input) {
    return res.status(500).send("Empty Input");
  }

  try {
    const filePath = await generateFile(lang, code);
    const inputPath = await generateInputFile(input);
    let output;
    if (lang === "cpp") {
      output = await executeCpp(filePath, inputPath);
    } else if (lang == "py") {
      output = await executePython(filePath, inputPath);
    } else if (lang == "js") {
      output = await executeJS(filePath, inputPath);
    }

    res.json({
      message: "Success",
      filePath,
      output,
      inputPath,
    });
  } catch (error) {
    console.log("Error while running code: ", error);
    res.status(500).json({ error: "Server error", details: error });
  }
});

router.post("/submit", authenticateToken, async (req, res) => {
  try {
    const { code, problem_id, lang } = req.body;
    const username = req.user.email;
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    user.submission_count++;
    let alreadysolved = false;
    if (!user.problems_solved.includes(problem_id)) {
      alreadysolved = true;
    }
    const filePath = generateFile(lang, code);
    const problem = await Problem.findById(problem_id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    problem.submission_count++;
    for (let i = 0; i < problem.example_cases.length; i++) {
      const inputPath = await generateInputFile(problem.example_cases[i].input);
      let output;
      if (lang === "cpp") {
        output = await executeCpp(filePath, inputPath);
      } else if (lang == "py") {
        output = await executePython(filePath, inputPath);
      } else if (lang == "js") {
        output = await executeJS(filePath, inputPath);
      }
      if (output === problem.example_cases[i].output) {
        continue;
      } else if (output === "Time Limit Exceeded") {
        await problem.save();
        await user.save();
        return res.json({
          message: `TLE at Example testcase`,
          verdict: "Time Limit Exceeded",
        });
      } else {
        await problem.save();
        await user.save();
        return res.json({
          message: `Failed at Example testcase `,
          verdict: "Wrong Answer",
        });
      }
    }
    for (i = 0; i < problem.hidden_cases.length; i++) {
      const inputPath = await generateInputFile(problem.hidden_cases[i].input);
      let output;
      if (lang === "cpp") {
        output = await executeCpp(filePath, inputPath);
      } else if (lang == "py") {
        output = await executePython(filePath, inputPath);
      } else if (lang == "js") {
        output = await executeJS(filePath, inputPath);
      }
      if (output === problem.hidden_cases[i].output) {
        continue;
      } else if (output === "Time Limit Exceeded") {
        return res.json({
          message: `TLE at Example testcase`,
          verdict: "Time Limit Exceeded",
        });
      } else if (output.includes("Time Limit Exceeded")) {
        return res.json({
          message: `Failed at testcase ${i + 1}`,
          verdict: "Time Limit Exceeded",
          output: output,
        });
      } else {
        await user.save();
        await problem.save();
        return res.json({
          message: `Failed at testcase ${i + 1}`,
          verdict: "Wrong Answer",
        });
      }
    }
    problem.accepted_count++;
    if (alreadysolved) {
      user.problems_solved.push(problem_id);
      user.problems_solved_count++;
    }
    await user.save();
    await problem.save();
    res.json({
      verdict: "Accepted",
      message: "All test cases passed",
    });
  } catch (error) {
    console.log("Error while submitting code: ", error);
    res.status(500).json({ error: "Server error", details: error });
  }
});

module.exports = router;
