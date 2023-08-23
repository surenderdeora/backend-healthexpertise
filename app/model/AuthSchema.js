const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  phoneNo: Number,
  password: String,
});

const AuthModel = mongoose.model('auth', AuthSchema);
module.exports = AuthModel;
