const express = require("express");
const router = express.Router()
const User = require('../modals/user');

router.get('/signin',(req,res) => {
    
})


router.post('/signup',(req,res) => {
    
   User.findOne({ email: req.body.email })
   .exec((error,user) => {
    if(user ) return res.status(400).json({
       message: 'User already registered'
    });









   })

})



module.exports = router;