const express = require('express');
const { signup, signin } = require('../controller/auth');
const router = express.Router();
const { validationRequest, isRequestValidated } = require('../validators/auth');

router.post('/signup', validationRequest ,isRequestValidated,signup);
router.post('/signin',signin);



module.exports = router;