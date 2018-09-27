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

//ir a perfil - muestra listado de clientes en rol restaurante
router.get("/privateProfile", (req, res, next) => {
  User.findById(req.user._id)
  .then(user => {
    User.find({isRestaurant: false})
    .then(rest => {
      Review.find({client: req.user._id})
      .then(rev => {
        Discount.find({client: req.user._id})
        .then(dis => {
      res.render("profiles/privateProfile", { user, rest, rev, dis })
        })
      })
    })
  })
    .catch(err => console.log(err))
});

//details of client profile for restaurants
router.get("/publicProfile/:id", (req, res, next) => {
  let userId = req.params.id;
  User.findById({'_id': userId})
  .then(user => {
    Review.find({client: userId})
    .then(rev => {
    res.render('profiles/publicProfile', { user, rev })
  })

  .catch(err => console.log(err))
})
}); 

//guardar nueva review
router.post("/publicProfile/:id", (req, res, next) => {
  const reviewText = req.body.reviewText;
  const restaurant = req.body.username;
  const client = req.params.id;
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

//Editar perfil
router.get('/edit/:id', (req, res) => {
  const userId = req.params.id
  User.findById(userId)
  .then(user => {
      res.render('profiles/edit', {user});
    })
})


router.post('/edit/:id', uploadCloud.single('profilePic'), (req, res, next) => {
  const profilePic = req.file.url;
  const { username, bio, address, city } = req.body;
  User.findOneAndUpdate({ '_id': req.params.id }, { $set: { profilePic, username, bio, address, city }, })
    .then(() => {
      res.redirect("/profile/privateProfile")
    })

    .catch(next)
});


module.exports = router;