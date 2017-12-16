const mongoose = require('mongoose').connect('mongodb://localhost/todoapps');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userTasks = new Schema({
    username    : String,
    password    : String

});

module.exports = mongoose.model('userTask', userTasks);;
