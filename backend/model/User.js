const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
});
const User = mongoose.model("payTmUser", userSchema);
module.exports = User;
