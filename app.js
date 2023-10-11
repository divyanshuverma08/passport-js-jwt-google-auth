require('dotenv').config()
const express = require("express");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

try {
  mongoose.connect("mongodb://127.0.0.1/passport-jwt");
} catch (error) {
  console.log(error);
}

const db = mongoose.connection;

db.on("connected", function () {
  console.log("Mongoose default connection established.");
});

db.on("close", function () {
  console.log("Mongoose connection closed.");
});

// When the connection is disconnected
db.on("disconnected", function () {
  console.log("Mongoose default connection ended.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require("./config/jwtStrategy");
require("./config/googleStrategy")


app.use('/',require("./routes"))

app.listen(PORT, () => {
  console.log("Server listening at port", PORT);
});
