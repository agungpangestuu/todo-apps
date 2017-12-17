const jwt = require('jsonwebtoken')
const CheckLogin = (req,res,next) => {
    if (req.headers.token) {
        let check = jwt.verify(req.headers.token, 'todo',(err,decoded) => {
            if(err){
                res.status(401).json({
                    message : "Your UserName Or Passwor Wrong"
                })
            }
            else {
              console.log(decoded);
              req.isLogin = decoded
              next()
            }
        })
    }
    else {
        res.status(403).json({
            message : "You must login"
        })
    }
}
const authoriztion = (req,res,next) => {
    if (req.isLogin.role == 'Admin') {
        next()
    }
    else {
        res.status(401).json({
            message : 'Unauthorized'
        })
    }
}
module.exports = {CheckLogin, authoriztion};
