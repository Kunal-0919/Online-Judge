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
app.use(cookieParser());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

DBConnection();

// Routes
const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problem");
const userProfileRoutes = require("./routes/userprofile");
const coderunnerRoutes = require("./routes/runcode");

app.use("/problem", problemRoutes);
app.use("/auth", authRoutes);
app.use("/userprofile", userProfileRoutes);
app.use("/runcode", coderunnerRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
