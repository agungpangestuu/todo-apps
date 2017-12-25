const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userTasks = new Schema({
    username    : {type : String, unique : true},
    password    : {type : String, required : true},
    role        : {type : String, default : "User"}

});

userTasks.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
});

module.exports = mongoose.model('userTask', userTasks);;
