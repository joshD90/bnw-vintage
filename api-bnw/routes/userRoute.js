const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/userModel.js");

//we export the module as a function that returns our router and pass the passport as a param so that we can
//access the passport once it has been initialized in our index file
module.exports = function (passport) {
  //set up our router to use middleware
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));

  //this route endpoint creates a new user.
  router.post("/create", async (req, res) => {
    try {
      //we create our salt using bcrypt
      const salt = await bcrypt.genSalt(10);
      //we create a hash by passing our password to bcrypt and salting it
      const hash = await bcrypt.hash(req.body.password, salt);
      //create a mongoose document of our new user with the hashed password
      const newUser = new User({ email: req.body.email, password: hash });
      //once that is done we actually save the user doc to mongoose
      const savedUser = await newUser.save();
      //and return to client
      res.json(savedUser);
    } catch (error) {
      console.log(error);
    }
  });
  //this route endpoint logs us in.  The middleware activates our local strategy which will know
  //how to process the req.body.email / password.  If unsuccessful the router will redirect to another
  //enpoint.  If successful it will create a req.user object and a cookie session on the client side
  router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("You are now logged in");
    console.log("You are now logged in", req.user);
  });
  //return the router
  return router;
};
