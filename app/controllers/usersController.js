const User = require('../models/user')
const _ = require('lodash')

module.exports.list=(req,res)=>{
    User.find()
    .then(users=>{
        //console.log(users)
        //res.json(_.pick(users,['_id','fullName','email','createdAt'])) - why not working to be checked
        res.json(users)
    })
    .catch(err=>{
        res.json({error:err})
    })
}

module.exports.listEventAgents=(req,res)=>{
    const role = "Agent"
    User.find({role})
    .then(user=>{
        if(user)
        {
            res.json(user)

        }
        else
        res.json({})
    })
    .catch(err=>{
        res.json({error:err})
    })
}

module.exports.listCustomers=(req,res)=>{
    const role = "Customer"
    User.findOne({role})
    .then(user=>{
        if(user)
        res.json(user)
        else
        res.json({})
    })
    .catch(err=>{
        res.json({error:err})
    })
}

module.exports.register=(req,res)=>{
    const {body}=req
    if(((body.role=='Agent' || body.role=='Customer') && body.cardNo) || (body.role=='Admin'))
    {
        const user = new User(body)
        user.save()
        .then(user=>{
            res.json(_.pick(user,['_id','fullName','email','createdAt']))
        })
        .catch(err=>{
            res.json({error:err})
        })
    }
    else if(body.cardNo){
        res.json({error:"Role is mandatory to be given"})
    }
    else {
        res.json({error:"ID Card No is mandatory to be given"})
    }
}

module.exports.login=(req,res)=>{
    const {body}=req
    User.findByCredentials(body.email,body.password)
        .then((user)=>{
            return user.generateToken()
        })
        .then((token)=>{
            res.send({token})
        })
        .catch(err=>{
            res.send(err)
        })
}

module.exports.show=(req,res)=>{
    const {id}=req.params
    User.findOne({_id:id})
    .then(user=>{
        if(user)
            res.json(user)
        else
            res.json({})
    })
    .catch(err=>{
        res.json({error:err})
    })
}

module.exports.update=(req,res)=>{
    const {id}=req.params
    const {body}=req
    console.log(req.user.fullName,req.user.role)
    // console.log(req.user._id==id)
    if(req.user._id==id || req.user.role=="Admin")
    {
        User.findOneAndUpdate({_id: id }, { $set: body }, { new: true, runValidators: true })
        //User.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        .then(user=>{
            console.log(user)
            if(user){
                res.json(user)
            }
            else {
                res.json({})
            }
        })
        .catch(err=>{
            res.json({error:err})
        })
    }
    else{
        res.json({})
    }
    
}

module.exports.destroy=(req,res)=>{
    const {id}=req.params
    console.log("came to destroy")
    User.findByIdAndDelete(id)
    .then(user=>{
        if(user)
        //when user is deleted the user object is returned right now. Can change in future to instead send a message that user is deleted. Upto FE now to show right message to user.
            res.json(user)
        else
        {
            console.log("user",user)
            res.json({})
        }
            
    })
    .catch(err=>{
        res.json({error:err})
    })
}

module.exports.logout = (req,res)=>{
    console.log("here")
    //here user and token is assigned into req object via authenticateUser middleware function
    const {user,token}=req
    //tokens array not getting deleted on logout--issue --it was because authenticateUser not given in route for logout
    console.log(user,token)
    //The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
    User.findByIdAndUpdate(user._id, { $pull: { "tokens": { token : token } } })
        .then(function () {
            res.send({ notice: 'successfully logged out' })
        })
        .catch(function (err) {
            res.send(err)
        })
}

