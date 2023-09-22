const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
