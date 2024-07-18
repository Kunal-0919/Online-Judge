const mongoose = require("mongoose");

const exampleCaseSchema = new mongoose.Schema({
  input: {
    type: String, // Assuming input and output are both strings. Change to another type if needed.
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const problemSchema = new mongoose.Schema({
  problem_name: {
    type: String,
    required: true,
  },
  problem_desc: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  input_format: {
    type: String,
    required: true,
  },
  output_format: {
    type: String,
    required: true,
  },
  constraints: {
    type: [String], // Changed to an array of strings
    required: true,
  },
  example_cases: [exampleCaseSchema], // Use the nested schema here
  created_at: {
    type: Date,
    default: Date.now,
  },
  submission_count: {
    type: Number,
    default: 0,
    required: false,
  },
  accepted_count: {
    type: Number,
    default: 0,
    required: false,
  },
  topic_tags: {
    type: Array, // Changed to an array of strings
  },
});

module.exports = mongoose.model("Problem", problemSchema);
