const Task = require('../models/task')
const ObjectId=require('mongodb').ObjectID;
const mongoose = require('mongoose')

module.exports = {
    createTask (req,res){
        const task = new Task ({
            task : req.body.task,
            description : req.body.description,
            createdAt : new Date(),
            updateAt : new Date(),
            userId : req.isLogin.userId
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
        Task.find({userId : req.isLogin.userId})
        .then(result => {
            res.json({
                message : "sukses get All",
                data : result
            })
        })
        .catch(err => {
          res.status(500).json({
            message : err
          })
        })
    },

    getAllTask(req,res){
        Task.find()
        .then(result => {
            res.json({
                message : "Succses to Get All task Users",
                data : result
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
    },

    updateTask (req,res){
      console.log(req.params.idTask);
        Task.findOne({"_id" : req.params.idTask})
        .then(result =>{
            if (req.isLogin == result.userId) {
                result.task = req.body.task
                result.description = req.body.description
                result.UpdatedAt = new Date()
                console.log(result);
                result.save()
                .then(status => {
                    res.json({
                        message : "Sukses update",
                        data : result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message : err
                    })
                })
            }
            else {
                res.status(500).json({
                    message : err
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message : "Id Task Tidak Ditemukan"
            })
        })
    },

    deleteTask (req,res){
      Task.findOne({"_id" : req.params.idTask})
      .then(result => {
          if (req.isLogin == result.userId) {
            Task.deleteOne({"_id" : req.params.idTask})
            .then(() => {
              res.status(200).json({
                message : `Sukses to delete ${req.params.idTask}`
              })
            })

          }
      })
    },

    markTask(req,res){
        Task.findOne({"_id" : req.params.idTask})
        .then(result => {
            if (req.isLogin == result.userId) {
              Task.updateOne({"_id" : req.params.idTask},
              { $set : {status : req.params.status} })
              .then(result => {
                rs.status(200).json({
                  message : `Task ${req.params.idTask} Completed` ,
                  data : result
                })
              })
              .catch(err => {
                res.status(500).json({
                  message : err
                })
              })
            }
        })
        .catch(err => {
            res.json({
              message : err
            })
        })
    }
    
}
