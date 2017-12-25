const mongoose = require('mongoose')
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const Tasks = new Schema({
    task   : String,
    description : {type : String, default : '' },
    status : {type : Boolean, default : false },
    createdAt : {type : Date },
    UpdatedAt : {type : Date },
    userId : { type : ObjectId, ref : 'userTask'}
});

const Task = mongoose.model("Task",Tasks);
module.exports = Task
