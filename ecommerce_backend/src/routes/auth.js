/**
 * * title: user authentication route
 * * description: this is used to define the normal user authentication with preferred route
 * * author: Tareq Monower
 *
 * @format */

const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignUpRequest,validateSignInRequest, isRequestValidated } = require('../validators/auth');

//requiring Router object of the express 
const router = express.Router();

// setting up signin and signup route
router.post('/signup', validateSignUpRequest ,isRequestValidated,signup);
router.post('/signin',validateSignInRequest ,isRequestValidated,signin);


module.exports = router;