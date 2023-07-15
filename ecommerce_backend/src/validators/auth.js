/**
 * * title: auth validator file
 * * description: this is the file used to validate all the signin and signup fuctions fields
 * * author: Tareq Monower
 *
 * @format */

const { check, validationResult } = require("express-validator");

//signup request validation request
exports.validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

//signin request validation request
exports.validateSignInRequest = [
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

// request validated middlewire to show the error message from the array
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  //forwarding this request to the next function
  next();
};
