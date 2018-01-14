const mongoose = require('mongoose')
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const Tasks = new Schema({
    task   : String,
    description : {type : String, default : '' },
    status : {type : Boolean, default : false },
    createdAt : {type : Date },
    dueDate : {type : Date, default: Date.now },
    userId : { type: Schema.Types.ObjectId, ref : 'User'}
});

const Task = mongoose.model("Task", Tasks);
module.exports = Task
