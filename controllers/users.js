const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userTask');

module.exports = {
    create(req,res){
      User.create({
        username : req.body.username,
        password : req.body.password
      })
      .then(result => {
        res.status(200).json({
          message : "Sukses create new user",
          data : result
        })
      })
      .catch(err => {
        res.status(500).json({
          message : err
        })
      })
    },

    getAllUser (req,res){
      User.find()
      .then(result => {
        res.status(200).json({
          message : "Succes to get All User",
          data : result
        })
      })
    },

    signin(req,res){
        User.findOne({username : req.body.username})
        .then(result => {
            if (result && result.username == req.body.username) {
              console.log(req.body.password, result.password);
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    let token = jwt.sign({ "userId" : result._id, "role" : result.role}, 'todo');
                    res.status(200).json({
                        message : "Login Sukses",
                        token : token
                    })
                }
                else {
                    res.status(403).json({
                        message : "Your Username or Password Wrong !!"
                    })
                }
            }
            else {
                res.status(403).json({
                    message : "Your Username or Password Wrong !!"
                })
            }
        })
    },

    updateUser(req,res){
      // User.updateOne({ "_id" : req.params.idUser }
      // , { $set: req.body })
      // .then(result => {
      //   res.status(200).json({
      //     message : "succes",
      //     data : result
      //   })
      // })
      // .catch(err => {
      //   res.status(500).json({
      //     message : err
      //   })
      // })
      // console.log(req.params.idUser);
        User.findOne({"_id" : req.params.idUser})
        .then(result => {
          console.log(result);
            if (result) {
                result.username = req.body.username || result.username
                result.password = req.body.password || result.password
                result.role = "User"
                result.save()
                .then(data =>{
                    res.status(200).json({
                      message : "sukses update user"
                    })
                })
            }
        })
        .catch(err => {
          res.status(500).json({
            message : "ID User Not Found"
          })
        })
    },

    deleteUser(req,res){
      User.removeOne({ "_id" : req.params.idUser })
      .then( result => {
        message : `Succes to delete user id ${req.params.idUser}`
      })
    }
};
