const express = require('express');
const { signup, signin } = require('../controller/auth');
const router = express.Router();
const { validateSignUpRequest, isRequestValidated } = require('../validators/auth');

router.post('/signup', validateSignUpRequest ,isRequestValidated,signup);
router.post('/signin',validateSignUpRequest ,isRequestValidated,signin);



module.exports = router;