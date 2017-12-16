const mongoose = require('mongoose').connect('mongodb://localhost/todoapps', { useMongoClient: true })
const Schema = mongoose.Schema

const Tasks = new Schema({
    task   : String,
    description : {type : String, default : '' },
    status : {type : Boolean, default: false}
});

const Task = mongoose.model("Task",Tasks);
module.exports = Task
