const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ error: "Unauthorized: Token not found" });
  }
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: token not found" });
  }
  try {
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    req.userPayload = decodedValue;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Invalid token",
      details: error.message,
    });
    }
    // Generate JWT Token
    const generateToken = (userData) => {
        return jwt.sign(userData,process.env.JWT_SECRET)
    }
};

module.exports = {jwtAuthMiddleware,generateToken}
