const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fb_id     : Number,
  email     : String,
  name      : String,
  profile   : String,
  createdAt : {
      type  : Date,
      default : new Date()
  }
});

const User = mongoose.model("User",userSchema);

module.exports = User;
