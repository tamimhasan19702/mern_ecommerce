const express = require('express');
const { signup, signin} = require('../../controller/admin/auth');
const router = express.Router();
const { validateSignUpRequest, isRequestValidated } = require('../validators/auth');

router.post('/admin/signup', validateSignUpRequest ,isRequestValidated,signup);
router.post('/admin/signin',validateSignUpRequest ,isRequestValidated,signin);


module.exports = router;