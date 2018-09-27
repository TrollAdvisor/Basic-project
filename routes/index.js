const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js');

router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
