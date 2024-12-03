const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: { type: String },
  contactNumber: { type: String },
  address: { type: String },
  profilePicture: { type: String },
});

const User = mongoose.model("User", UserSchema)
module.exports = User