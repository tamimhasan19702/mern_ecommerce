const express = require('express');
const { signup, signin } = require('../controller/auth');
const router = express.Router();
const { check } = require('express-validator')

router.post('/signup',[
            check('firstName')
            .notEmpty()
            .withMessage('firstName is required'),
            check('lastName')
            .notEmpty()
            .withMessage('lastName is required'),
            check('email')
            .isEmail()
            .withMessage('Valid Email is required'),
            check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 character long')
            ], signup);
router.post('/signin',signin);



module.exports = router;