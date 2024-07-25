const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: null,
  },
  birthday: {
    type: Date,
    default: null,
  },
  organization: {
    type: String,
    default: null,
  },
  github: {
    type: String,
    default: null,
  },
  linkedin: {
    type: String,
    default: null,
  },
  submission_count: {
    type: Number,
    default: 0,
  },
  problems_solved: {
    type: Array,
    default: [],
  },
  problems_solved_count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
