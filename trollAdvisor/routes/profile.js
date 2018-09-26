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

//ir a perfil
router.get("/privateProfile", (req, res, next) => {
  User.findById(req.user._id).then(user => {
    User.find({isRestaurant: false})
    .then(rest => 
      res.render("profiles/privateProfile", { user, rest })
      )
  })
    .catch(err => console.log(err))
});

router.get("/customerProfile", (req, res, next) => {
  User.findById(req.user._id).then(user => {
    User.find({isRestaurant: false})
    .then(rev => 
      res.render("profiles/customerProfile", { user, rev })
      )
  })
    .catch(err => console.log(err))
});

router.get("/publicProfile/:id", (req, res, next) => {
  let userId = req.params.id;
  User.findById({'_id': userId})
  .then(user => {
    Review.find({client: userId})
    .then(rev => {
      console.log(user)
        console.log(rev)
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

// router.get()


// router.post("/signup1", (req, res, next) => {

//   const profilePic = req.file.url;
//   const email = req.body.email;
//   const password = req.body.password;
//   const bio = req.body.bio;
//   const address = req.body.address;
//   const city = req.body.city;
//   if (username === "" || password === "") {
//     res.render("auth/signup", { message: "Indicate username and password" });
//     return;
//   }

//   User.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("auth/signup", { message: "The username already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       username,
//      // profilePic,
//       email,
//       password: hashPass,
//       bio, 
//       address,
//       city
//     });

//     newUser.save()
//     .then(user => {
//       if(user.rol == "Pepe"){
//         res.render(`auth/correctlySignUp/${user._id}`);
//       }else {
//         res.render()
//       }
//     })
//     .catch(err => {
//       res.render("auth/signup", { message: "Something went wrong" });
//     })
//   });
// }); 

module.exports = router;