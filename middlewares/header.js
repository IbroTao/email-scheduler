const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET = process.env.SECRET;

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const accessToken = await jwt.verify(token, SECRET);
      req.user = accessToken;
      if (accessToken) {
        next();
      } else res.status(403).json("You are not authenticated");
    } else res.status(401).json("Please add authorization header!");
  } catch (err) {
    res.status(500).json(err);
  }
};

const verifyAndAuthorizeUser = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.params.id === req.user.sub) {
      next();
    } else res.status(403).json("You are not authorized");
  });
};

const verifyAndAuthorizeAdmin = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else res.status(403).json("You are not authorized");
  });
};

module.exports = {
  verifyUser,
  verifyAndAuthorizeUser,
  verifyAndAuthorizeAdmin,
};
