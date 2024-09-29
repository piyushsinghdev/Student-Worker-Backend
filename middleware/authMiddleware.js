const jwt = require("jsonwebtoken");
const SECRET_KEY = "piyush";  // In production, store this securely in environment variables

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded)
    req.email = decoded.username;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = { authenticateToken };
