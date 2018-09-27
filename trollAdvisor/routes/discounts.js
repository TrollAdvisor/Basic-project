const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Review = require("../models/Review");
const Discount = require("..//models/Discount");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10
const multer = require('multer'); //for uploading images
const uploadCloud = require('../config/cloudinary.js');

router.get("/:id", (req, res, next) => {
  console.log(req.params.id)
  User.findById(req.params.id)
  .then (user => {
    res.render("profiles/discounts", {user})
  })
})    

router.post("/:id", (req, res, next) => {
  const type = req.body.type;
  const pax = req.body.pax;
  const message = req.body.message;
  const client = req.params.id;
  const restaurant = req.user._id;
  console.log(client)

  const newDiscount = new Discount ({
    type,
    pax,
    message,
    client,
    restaurant
  });

  newDiscount.save()
  .then(discount => {
    res.redirect("/profile/privateProfile")
   })
  .catch(err => {
    console.log(err)
  })
});

module.exports = router;