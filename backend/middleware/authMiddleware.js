const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed: No token provided",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error verifying token: ", error);
    res.status(401).json({
      message: "Authentication failed: Invalid token",
      success: false,
    });
  }
};

module.exports = authMiddleware;
