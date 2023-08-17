/**
 * * title: admin authentication controller function
 * * description: this file is to create admin authentication signin and signup fuctions
 * * author: Tareq Monower
 *
 * @format */

const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");


// admin signup controller function
exports.signup = async (req, res) => {
  try {
    // Check if admin already exists in the database
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        message: "Admin already registered",
      });
    }

    // Count the number of users in the database
    const count = await User.estimatedDocumentCount();
    let role = "admin";
    if (count === 0) {
      role = "super-admin";
    }

    // Extract admin signup request from the client
    const { firstName, lastName, email, password } = req.body;

    // Hash the password
    const hash_password = await bcrypt.hash(password, 10);

    // Create a new user object
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
      role,
    });

    // Save the user object to the database
    const data = await _user.save();
    if (data) {
      return res.status(201).json({
        message: "Admin created successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};


// This function handles the sign-in process for admin users
exports.signin = async (req, res) => {
  try {
    // Find the user with the provided email address
    const user = await User.findOne({ email: req.body.email }).exec();

    // If no user is found, return an error response
    if (!user) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    // Check if the password provided is correct
    const isPasswordCorrect = await user.authenticate(req.body.password);

    if (isPasswordCorrect && (user.role === "admin" || user.role === "super-admin")) {
      // Generate a token with the user's ID and role
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Extract relevant user information
      const { _id, firstName, lastName, email, role, fullName } = user;

      // Set the token as a cookie with a 30-day expiration
      res.cookie("token", token, { expiresIn: "30d" });

      // Send a success response with the token and user information
      res.status(200).json({
        token,
        user: { _id, firstName, lastName, email, role, fullName },
      });
    } else {
      // Return an error response if the password is incorrect
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
  } catch (error) {
    // Return an error response if an error occurs during execution
    return res.status(400).json({ error });
  }
};

//admin signout function created to clear the admin token cookie
exports.signout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Send a success response with a message
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
