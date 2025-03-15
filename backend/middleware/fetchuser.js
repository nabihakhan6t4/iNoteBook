const jwt = require("jsonwebtoken");
const JWT_SECRET = "NABIHAISGOOD";

const fetchuser = (req, res, next) => {
  // "Authorization" header ya "auth-token" check karo
  const token = req.header("Authorization")?.split(" ")[1] || req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Attach user ID to request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = fetchuser;
