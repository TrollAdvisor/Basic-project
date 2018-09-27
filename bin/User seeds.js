// Seeds file that remove all users and create 2 new users
// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Review = require("../models/Review");
const Discount = require("../models/Discount");
const bcryptSalt = 10;

mongoose
  .connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "Max Powers",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'max@powers.com',
    bio: 'I am an amazing, clean and rich person, I want to spend a lot of money at your restaurant.',
    isRestaurant: false
  },
  {
    username: "Bob Sponge",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'bob@sponge.com',
    bio: 'Pine-Apple-House',
    isRestaurant: false
  },
  {
    username: "Mini Me",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'mini@me.com',
    bio: 'I hate you all. My dad is very rich. I will kill you all. Love me',    ratingAverage: 2,
    isRestaurant: false
  },
  {
    username: "Gobo",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'gobo@miau.com',
    bio: 'I am a cat in real life. I love eating everything, including plastic, so I will love almost every type of food',
    isRestaurant: false
  },
  {
    username: "Tanis",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'tanis@satan.com',
    bio: 'I am THE CREATOR. I will persecute you in your dreams, and this is my idea.',
    isRestaurant: false
  },
  {
    username: "Anna Hogberg",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'anna@holaquetal.com',
    bio: 'Ironhackeando.',
    isRestaurant: false
  },
  {
    username: "Salmonella-Van",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'salmo@nella.com',
    address: 'Paseo de la Chopera, 14',
    city: 'Madrid',
    isRestaurant: true
  },
  {
    username: "Alhambra",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'al@hambra.com',
    address: 'Calle Real de la Alhambra',
    city: 'Granada',
    isRestaurant: true
  },
  {
    username: "Ironhack",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'ironhack.pepe@gmail.com',
    address: 'Ironhack-kitchen',
    city: 'Madrid',
    isRestaurant: true
  },
  {
    username: "Shipping-ship",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'shipping@gmail.com',
    address: 'Paseo Marítimo, 1',
    city: 'A Coruña',
    isRestaurant: true
  },
  {
    username: "Wish",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    email: 'wish@gmail.com',
    address: 'Calle de San Andrés, 1',
    city: 'Madrid',
    isRestaurant: true
  }

]

let reviews = [
  "A new kind of client getting highest quotes of unpleasant smell and bad modals. He just asked for some water and bread, and spent 45 min yelling at his hand. Didn' left any tip.", "I had doubts about permitting access to this client, regarding to his previous reference. It seems he took his medicine, this time, or maybe because of the companion, but they spend a lot of money with the best modals.", "Why on earth does he only want pineapples? At least he was well-educated, although he didn't make a big price.", "He left a lot of money, but I do not want him here again, it's a mess. I will must rebuild all the restaurant.", "He pretends to be evil, but he is lovely.", 
];

let typeDiscount = [10, 10, 25, 50, 5];

let messageDiscount = ['Get fun!', 'Good appetite!', 'Enjoy with us', 'Let us know if you like it', 'Best regards'];

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
  let counterNotRes = 0;


  usersCreated.map((user,i)=> {
    if(user.isRestaurant==false){
      let review = new Review({
        restaurant: user._id,
        client: user._id ,
        reviewText: reviews[counterNotRes]
      })
      review.save()
      
      let discount = new Discount({
        type: typeDiscount[counterNotRes],
        message: messageDiscount[counterNotRes],
        client: user._id
      })
      discount.save()
      counterNotRes++
    }
  })



})

