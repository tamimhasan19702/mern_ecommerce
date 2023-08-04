/**
 * * title: Intial data route
 * * description: this the initial product and categories response route
 * * author: Tareq Monower
 *
 * @format */

const express = require("express");
const { initialData } = require("../../controller/admin/initialData");
const router = express.Router();

//router admin signin,signup and signout routes
router.post("/initialdata", initialData);

module.exports = router;
