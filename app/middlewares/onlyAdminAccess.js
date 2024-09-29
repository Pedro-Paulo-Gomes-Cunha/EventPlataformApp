const User = require('../models/user')

const onlyAdminAccess =   (req,res,next)=>{
    const token = req.header('x-auth')
    console.log("came to onlyAdminAccess")
    User.findByToken(token)
        .then(user=>{
            if(user){
                req.user = user
                req.token = token
                console.log("req.user",req.user)
                if(req.user.role=="Admin")
                next()
                else
                res.status('401').send({notice:'you are not allowed to access this link'})
            }
            else {
                res.status('401').send({notice:'you are not allowed to access this link'})
            }
        })
        .catch(err=>{
            res.status('401').send(err)
        })

}

module.exports= { onlyAdminAccess }