const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Review = require("../models/Review");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10
const multer = require('multer'); //for uploading images
const uploadCloud = require('../config/cloudinary.js');
//const sendMail = require('../mail/sendMail');

router.get("/:id", (req, res, next) => {
  res.render("profiles/discounts")
})    

router.post("/:id", (req, res, next) => {
  const type = req.body.type;
  const pax = req.body.pax;
  const message = req.body.message;

  console.log(reviewText);

  const newReview = new Review ({
    reviewText,
    restaurant,
    client
  });

  newReview.save()
  .then(review => {
    res.redirect("/profile/privateProfile")
   })
  .catch(err => {
    console.log(err)
  })
});

module.exports = router;