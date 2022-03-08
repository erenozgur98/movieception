const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');

const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const app = express();

app.use(session({
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true
}));


// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/true-story",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
