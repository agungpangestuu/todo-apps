const jwt=require("jsonwebtoken");
const jwtSecret=process.env.JWT_SECRET;
const ObjectId=require('mongodb').ObjectID;
const User=require("../models/userTask");
const mongoose = require('mongoose')

const {Facebook, FacebookApiException} = require('fb'),
    fb = new Facebook({version: 'v2.11'});

module.exports = {
  loginFb(req,res){
    User.find().then((result)=>{
      res.json({
        message : "test",
        data : result
      })
    })
  },
  login:(req,res)=>{
    req.header.tokenFb = req.body.authResponse.accessToken
    fb.setAccessToken(req.body.authResponse.accessToken);
    fb.api(req.body.authResponse.userID,{fields:["id","name","email","picture"]},(response)=>{
      console.log(response)
      if(!response || response.error){
        res.send({status:false});
      } else {
        User.count({email:response.email}).then((result)=>{
          console.log(result);
          if(result === 0){
            const user = new User({
                fb_id:response.id,
                email:response.email,
                name:response.name,
                profile:response.picture.data.url
            })
            .save((err,stats)=>{
              const loginToken = jwt.sign({id:stats._id},jwtSecret);
              res.send({status:true, token:loginToken, id: stats._id, name: stats.name, picture: stats.profile});
            });
            // sendEmail(response.name,response.email);
          }
          else {
            console.log(result);
            User.findOne({email:response.email},(err,data)=>{
              // console.log(err)
                const loginToken = jwt.sign({id:data._id},jwtSecret);
                res.send({status:true, token:loginToken, id: data._id, name:data.name, picture: data.profile});
            });
          }
          }).catch((err)=>{
              res.send({status:false});
            });
        }
    });
  },
  // getUser:(req,res)=>{
  //   const userId = jwt.verify(req.body.token,jwtSecret);
  //   User.findOne({"_id":ObjectId(userId.id)},(err,data)=>{
  //       if(err || data === null){
  //           res.send({status:false});
  //       } else{
  //           res.send({status:true,user:data});
  //       }
  //   });
  // }
};