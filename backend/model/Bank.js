const mongoose = require("mongoose");
const User = require("./User");

const BankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const bankDetails = mongoose.model("BankDetail", BankSchema);
module.exports = bankDetails;
