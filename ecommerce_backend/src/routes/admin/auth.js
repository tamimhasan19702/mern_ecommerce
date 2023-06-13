const express = require('express');
const { signup, signin,signout} = require('../../controller/admin/auth');
const router = express.Router();
const { validateSignUpRequest,validateSignInRequest, isRequestValidated } = require('../../validators/auth');
const {requireSignin} = require('../../common-middlewires')

router.post('/admin/signup', validateSignUpRequest ,isRequestValidated,signup);
router.post('/admin/signin',validateSignInRequest ,isRequestValidated,signin);
router.post('/admin/signout',requireSignin,signout )

module.exports = router;