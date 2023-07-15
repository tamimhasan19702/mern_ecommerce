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

//admin signup controller function
exports.signup = (req, res) => {

  // finding if admin already exist in the database or not
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });

    User.estimatedDocumentCount(async (err, count) => {
      if (err) return res.status(400).json({ error });
      let role = "admin";
      if (count === 0) {
        role = "super-admin";
      }
       
      // taking the admin signup request from the client
      const { firstName, lastName, email, password } = req.body;
      
      //hashing password
      const hash_password = await bcrypt.hash(password, 10);

      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
        username: shortid.generate(),
        role,
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
      });
    });
  });
};

//admin signin controller function
exports.signin = (req, res) => {

  // looking through the user with request body email
  User.findOne({ email: req.body.email }).exec(async (error, user) => {

    // if error found after execution call this
    if (error) return res.status(400).json({ error });
    
    // if user found call this
    if (user) {

      //checking if password right or wrong
      const isPassword = await user.authenticate(req.body.password);

      if (isPassword && (user.role === "admin" || user.role === "super-admin")) {
        
        // creating separate token creaential for admin and super admin
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        //destructuring the values from the user
        const { _id, firstName, lastName, email, role, fullName } = user;

        // sending cookies with response to expire token after 1 day 
        res.cookie("token", token, { expiresIn: "1d" });
        
        // sending user response
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });

      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

//admin signout function created to clear the admin token cookie
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
