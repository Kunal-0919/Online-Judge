const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Unauthorized: No token provided");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized: Invalid token");
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
