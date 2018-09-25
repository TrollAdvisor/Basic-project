const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const multer = require('multer'); //for uploading images
const uploadCloud = require('../config/cloudinary.js');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//login
router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/profile/privateProfile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));


//SignUp
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  /* const profilePic = req.file.url; */
  const email = req.body.email;
  const password = req.body.password;
  //const rol = req.body.rol
  const isRestaurant = Boolean(req.body.isRestaurant);

  /* const bio = req.body.bio;
  const address = req.body.address;
  const city = req.body.city; */
  console.log(req.body);

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
     /*  profilePic, */
      email,
      password: hashPass,
     // rol
     isRestaurant

      /* bio, 
      address,
      city */
    });

    newUser.save()
    .then(user => {
      console.log(user)
      res.redirect("/auth/login");
    })
    .catch(err => {
      res.redirect("/auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
