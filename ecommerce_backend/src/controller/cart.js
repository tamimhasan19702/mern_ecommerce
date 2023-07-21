/**
 * * title: cart controller function
 * * description: this file is control cart route and as it's last middlewire
 * * author: Tareq Monower
 *
 * @format */

const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  //findining cart items with user id and returning error and cart item
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    //retrun if there's any error
    if (error) return res.status(400).json({ error });
    // if cart already exists then update cart by quantity
    if (cart) {
      //checking if the new added product is matched with previously added cartItems
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);

      //taking condition and update variable for  findOneAndUpdate method from mongoose
      let condition, update;

      //if item existed
      if (item) {
        //new condition
        condition = { user: req.user._id, "cartItems.product": product };
        //update and set the cartItems with previous properties and quantity
        update = {
          $set: {
            cartItems: {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        //if item never existed
        //create new condition for the cartItem
        condition = { user: req.user._id };
        //pushin the item's to the cartItems
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }

      //findOneUpdate takes condition and update argument which finds and updates cartItems

      Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        //if error found
        if (error) return res.status(400).json({ error });
        //returned cart Items
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      });
    } else {
      //if cart did not exist then create a new cart object with userItems and add cartItems
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      //saving cart and reteuning the cart object as a response to the request
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
