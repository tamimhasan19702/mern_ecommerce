/**
 * * title: cart route
 * * description: this is file is used to route through the cart items
 * * author: Tareq Monower
 *
 * @format */

const express = require("express");
const router = express.Router();

//adding middlewires and controllers
const { addItemToCart } = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middlewires");

//cart post request using router
router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

module.exports = router;
