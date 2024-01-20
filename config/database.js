const mongoose = require("mongoose");
const { DB_URL } = require("./config");

module.exports.connectDatabse = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/BlogDB");
    console.log("connected to mongoDB");
  } catch (error) {
    console.error("Problem connecting to databse: %s", error.message);
  }
};
