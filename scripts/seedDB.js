const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/true-story"
);

const userSeed = [
  {
    email: "shawnisthe@goat.com",
    username: "shawnthegoat",
    password: "shawnthegoat"
  },
  {
    email: "erenisthebest@gmail.com",
    username: "erenisawesome",
    password: "erenisawesome"
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " users inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });