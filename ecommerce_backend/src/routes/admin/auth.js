const express = require('express');
const { signup, signin} = require('../../controller/admin/auth');
const router = express.Router();
const { validateSignUpRequest,validateSignInRequest, isRequestValidated } = require('../../validators/auth');

router.post('/admin/signup', validateSignUpRequest ,isRequestValidated,signup);
router.post('/admin/signin',validateSignInRequest ,isRequestValidated,signin);


module.exports = router;