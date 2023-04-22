const User = require('../models/user');
const jwt = require('jsonwebtoken');
//signup function

exports.signup = (req,res) => {
    User.findOne({ email: req.body.email })
   .exec((error,user) => {
    if(user) return res.status(400).json({
    message: "User already registered"
    });

    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    
    const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username: Math.random().toString()
    });

    _user.save((error,data) => {
        if(error){
            return res.status(400).json({
                message: "Something went wrong"
            });
        }

        if(data){
            return res.status(201).json({
                message: "User created Successfully..!"
            });
        }

    });

   });
}

//signin function


exports.signin = (req,res) => {
    User.findOne({email: req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({ error });

        if(user){

         if(user.authenticate(req.body.password)){
            
         const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});


         }

        }else{
            return res.status(400).json({message: "Something went wrong"});
        }
    })
}