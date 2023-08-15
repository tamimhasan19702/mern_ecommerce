/**
 * * title: common middlewire functions for both admin and user
 * * description: common middlewire functions both exist in admin and user
 * * author: Tareq Monower
 *
 * @format */

//importing jason web token package
const jwt = require("jsonwebtoken");

//requireSignin middlewire to decode user token and alert them about the signin requirement
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    //decoding jwt token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
  // jwt.decode()
};

// userMiddlewire to ensure that the lgged in request role is user
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

// userMiddlewire to ensure that the lgged in request role is admin
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};

