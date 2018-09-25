const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


/* router.get("/signup1", (req, res, next) => {
  res.render("auth/signup1");
});

router.post("/signup1", (req, res, next) => {
  
  const profilePic = req.file.url;
  const email = req.body.email;
  const password = req.body.password;
  const bio = req.body.bio;
  const address = req.body.address;
  const city = req.body.city;
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
     // profilePic,
      email,
      password: hashPass,
      bio, 
      address,
      city
    });

    newUser.save()
    .then(user => {
      if(user.rol == "Pepe"){
        res.render(`auth/correctlySignUp/${user._id}`);
      }else {
        res.render()
      }
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
}); */