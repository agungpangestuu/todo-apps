const Task = require('../models/task')
const ObjectId=require('mongodb').ObjectID;
const mongoose = require('mongoose')

module.exports = {
    createTask (req,res){
        const task = new Task ({
            task : req.body.task,
            description : req.body.description
        })
        .save((err, response) => {
            if(!err){
                res.status(200).json({
                    message : "sukses to create task",
                    data : response
                })
            }
            else {
                res.status(500).json({
                    message : "Gagal create Task"
                })
            }
        })
    },

    getAll(req,res){
        Task.find()
        .then(result => {
            res.json({
                message : " sukses boss",
                data : result
            })
        })
    },
    
    updateTask (req,res){
        Task.findOne({"_id" : req.params.idTask})
        .then(result =>{
            result.task = req.body.task

            result.save()
            .then(status => {
                res.json({
                    message : "Sukses update",
                    data : result
                })
            }) 
        })
    },

    deleteTask (req,res){
        Task.deleteOne({"_id" : req.params.idTask})
        .then(() => {
            res.status(200).json({
                message : `Sukses to delete ${req.params.idTask}`
            })
        })
    }

}