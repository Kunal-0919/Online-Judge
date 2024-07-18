const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { DBConnection } = require("./database/db.js");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

DBConnection();

// Routes
const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problem.js"); // Adjust the path as necessary
app.use("/problem", problemRoutes);

app.use("/auth", authRoutes);

// app.get("/", (req, res) => {
//   try {
//     res.send("AlgoChef server");
//   } catch (error) {
//     console.log("Error on /: ", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
