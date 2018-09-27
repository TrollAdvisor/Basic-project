const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Review = require("../models/Review");

const bcryptSalt = 10;

mongoose
  .connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let reviews = [
  {
    //username: 'Max Power',
    date: '11/01/2018',
    pax: 1,
    ratingReview: "", 
    quiet: 4,
    tip: 0,
    hygiene: 2,
    modals: 0, 
    bigSpender: 1,
    reviewText: "A new kind of client getting highest quotes of unpleasant smell and bad modals. He just asked for some water and bread, and spent 45 min yelling at his hand. Didn' left any tip."
  },
  {
    //username: 'Max Power',
    date: '11/06/2018',
    pax: 4,
    ratingReview: "", 
    quiet: 10,
    tip: 10,
    hygiene: 10,
    modals: 10, 
    bigSpender: 10,
    reviewText: "I had doubts about permitting access to this client, regarding to his previous reference. It seems he took his medicine, this time, or maybe because of the companion, but they spend a lot of money with the best modals."
  },
  {
    //username: 'Bob Sponge',
    date: '11/09/2018',
    pax: 1,
    ratingReview: "", 
    quiet: 10,
    tip: 0,
    hygiene: 5,
    modals: 10, 
    bigSpender: 5,
    reviewText: "Why on earth does he only want pineapples? At least he was well-educated, although he didn't make a big price."
  },
  {
    //username: 'Mini Me',
    date: '23/09/2018',
    pax: 12,
    ratingReview: "", 
    quiet: 0,
    tip: 10,
    hygiene: 5,
    modals: 0, 
    bigSpender: 10,
    reviewText: "He left a lot of money, but I do not want him here again, it's a mess. I will must rebuild all the restaurant."
  },
  {
    //username: 'Tanis',
    date: '06/02/2018',
    restaurant: "5baa485f41ad1131b2e9e404",
    client: "5baa485f41ad1131b2e9e402",
    pax: 3,
    ratingReview: "", 
    quiet: 10,
    tip: 10,
    hygiene: 10,
    modals: 10, 
    bigSpender: 10,
    reviewText: "He pretends to be evil, but he is lovely."
  },
]

 
Review.deleteMany()
.then(() => {
  return Review.create(reviews)
})
.then(reviewsCreated => {
  reviews.find({}, (err, allreviews) => {
    allreviews.forEach((review)=> {
      console.log(review);
    })
  });
  console.log(`${reviewsCreated.length} users created with the following id:`);
  console.log(reviewsCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})