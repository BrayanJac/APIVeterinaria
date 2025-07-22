const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  idDog: String,
  name: String,
  breed: String,
  birth_date: Date,
  gender: String,
  owner: String,
  phone: String,
}, {collection: "dogs"});

module.exports = mongoose.model("Dog", dogSchema);