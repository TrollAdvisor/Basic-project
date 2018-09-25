// Seeds file that remove all users and create 2 new users
// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/trolladvisor', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "Max Powers",
    password: bcrypt.hashSync("Max Powers", bcrypt.genSaltSync(bcryptSalt)),
    email: 'max@powers.com',
    bio: 'I am an amazing, clean and rich person, I want to spend a lot of money at your restaurant.',
    isRestaurant: false
  },
  {
    username: "Bob Sponge",
    password: bcrypt.hashSync("Bob Sponge", bcrypt.genSaltSync(bcryptSalt)),
    email: 'bob@sponge.com',
    bio: 'Pine-Apple-House',
    isRestaurant: false
  },
  {
    username: "Mini Me",
    password: bcrypt.hashSync("Mini Me", bcrypt.genSaltSync(bcryptSalt)),
    email: 'mini@me.com',
    bio: 'I hate you all. My dad is very rich. I will kill you all. Love me',    ratingAverage: 2,
    isRestaurant: false
  },
  {
    username: "Gobo",
    password: bcrypt.hashSync("Gobo", bcrypt.genSaltSync(bcryptSalt)),
    email: 'gobo@miau.com',
    bio: 'I am a cat in real life. I love eating everything, including plastic, so I will love almost every type of food',
    isRestaurant: false
  },
  {
    username: "Tanis",
    password: bcrypt.hashSync("Tanis", bcrypt.genSaltSync(bcryptSalt)),
    email: 'tanis@satan.com',
    bio: 'I am THE CREATOR. I will persecute you in your dreams, and this is my idea.',
    isRestaurant: false
  },
  {
    username: "Salmonella-Van",
    password: bcrypt.hashSync("Salmonella-Van", bcrypt.genSaltSync(bcryptSalt)),
    email: 'salmo@nella.com',
    address: 'Paseo de la Chopera, 14',
    city: 'Madrid',
    isRestaurant: true
  },
  {
    username: "Alhambra",
    password: bcrypt.hashSync("Alhambra", bcrypt.genSaltSync(bcryptSalt)),
    email: 'al@hambra.com',
    address: 'Calle Real de la Alhambra',
    city: 'Granada',
    isRestaurant: true
  },
  {
    username: "Ironhack-kitchen",
    password: bcrypt.hashSync("Ironhack-kitchen", bcrypt.genSaltSync(bcryptSalt)),
    email: 'ironhack.pepe@gmail.com',
    address: 'Paseo de la Chopera, 23',
    city: 'Madrid',
    isRestaurant: true
  },
  {
    username: "Shipping-ship",
    password: bcrypt.hashSync("Shipping-ship", bcrypt.genSaltSync(bcryptSalt)),
    email: 'shipping@gmail.com',
    address: 'Paseo Marítimo, 1',
    city: 'A Coruña',
    isRestaurant: true
  },
  {
    username: "Wish",
    password: bcrypt.hashSync("Wish", bcrypt.genSaltSync(bcryptSalt)),
    email: 'wish@gmail.com',
    address: 'Calle de San Andrés, 1',
    city: 'Madrid',
    isRestaurant: true
  }

]
 
User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})