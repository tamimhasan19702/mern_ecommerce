/**
 * * title: admin authentication route
 * * description: this file is used to define the admin authentication with preferred route
 * * author: Tareq Monower
 *
 * @format */


const express = require('express');
const router = express.Router();

//importing controller fucntions
const { signup, signin,signout} = require('../../controller/admin/auth');

const { validateSignUpRequest,validateSignInRequest, isRequestValidated } = require('../../validators/auth');
const {requireSignin} = require('../../common-middlewires')

//router admin signin,signup and signout routes
router.post('/admin/signup', validateSignUpRequest ,isRequestValidated,signup);
router.post('/admin/signin',validateSignInRequest ,isRequestValidated,signin);

//clearing admin cookie by the signout function
router.post('/admin/signout',signout )

module.exports = router;