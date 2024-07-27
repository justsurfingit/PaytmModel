const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const init = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("Database connection established");
  } catch (e) {
    console.error("Error connecting to the database:", e.message);
  }
};

module.exports = init;
