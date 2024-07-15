const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { DBConnection } = require("./database/db.js");
const authRoutes = require("./routes/auth.js");
const problemRoutes = require("./routes/problem.js");
const indexRoutes = require("./routes/index.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

DBConnection();

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/problems", problemRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
