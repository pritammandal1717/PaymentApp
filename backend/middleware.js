const dotenv = require('dotenv')
const jwt = require("jsonwebtoken");
dotenv.config()

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      error: "Not authorized to access this resource"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();

    } else{
        return res.status(403).json({
            message : "Something Went Wrong"
        });
    }

  } catch (err) {
    return res.status(403).json({
        message : "Something Went Wrong"
    });
  }
};

module.exports = {
  authMiddleware
};
