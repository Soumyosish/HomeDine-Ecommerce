const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    let token = authHeader.slice(7).trim();
    token = token.replace(/^"|"$/g, "");

    // quick JWT shape check: part1.part2.part3
    if (
      !token ||
      token === "undefined" ||
      token === "null" ||
      token.split(".").length !== 3
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized, malformed token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
