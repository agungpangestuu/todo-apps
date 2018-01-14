const cron = require('node-cron');
const sendMail = require('./mailSend');
const Task = require('./models/task');
const User = require('./models/userTask')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://pangestu1134:test@pangestu-shard-00-00-xdp8x.mongodb.net:27017,pangestu-shard-00-01-xdp8x.mongodb.net:27017,pangestu-shard-00-02-xdp8x.mongodb.net:27017/todo-apps?ssl=true&replicaSet=pangestu-shard-0&authSource=admin', { useMongoClient: true });

 
cron.schedule('* * * * *', function(){
  console.log('running a task every minute');
  console.log('----------------------')
  let dataTask = []
  Task.find({status: false}).populate('userId')
  .then(data => {
    if (data.length > 0){
      console.log(data)
      dataTask = data
      data.forEach(dt => {
        console.log(dt.createdAt < new Date())
        if(dt.createdAt < new Date()){
          // dt.status = true
          sendMail(dt.userId.email)
          Task.deleteOne({"_id" : dt._id})
          .then(() => {
            console.log(dt)
          })
          .catch(err => console.log(err))
        }
      })
    }
    else {
      console.log(data)
    }
    // for (var key in dataTask) {
    //   if (object.hasOwnProperty(key)) {
    //     Task.deleteOne({"id" : key.id})
    //     .then(() => {
    //       console.log('delete')
    //     })
    //   }
    // }
    
  })
  .catch(err => console.log(err))
  console.log(dataTask)
  function inDays(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime()
    return parseInt((t2)/(24*3600*1000));
  }
});