/**
 * * title: user authentication controller function
 * * description: this file is to create functions for authenticate users in route folder
 * * author: Tareq Monower
 *
 * @format */

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

//this is for generating token
const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//signup controller function
exports.signup = (req, res) => {
  //checking if the is user already exist in the database or not
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered in the database!",
      });

    // taking data from the request body
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    });
  });
};

//signin controller function

exports.signin = (req, res) => {
  //checking if user exist or not
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });

    //is user exist follow this
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      
      //if password matches then follow this
      if (isPassword && user.role === "user") {
        
        //creating token with generateJwtToken function created previouslyf
        const token = generateJwtToken(user._id, user.role);

        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
