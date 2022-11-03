const mongoose = require("mongoose");

//create our user blueprint.  We only have one admin user
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//export our user model
module.exports = mongoose.model("User", UserSchema);
