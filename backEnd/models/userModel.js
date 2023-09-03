const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
      name: String,
      password: String,
      email: String,
});

module.exports.UserModel = mongoose.model("users", userSchema);
