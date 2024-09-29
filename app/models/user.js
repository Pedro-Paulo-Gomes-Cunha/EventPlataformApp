const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,'Received null value for name']
    },
    mobile:{
        type:String,
        minlength:10,
        maxlength:10,
        required:[true,'Received null value for mobile'],
        validate:{
            validator: (value)=>{
                return validator.isNumeric(value)
            },
            message:()=>{
                return 'invalid mobile number'
            }
        }
    },
    email:{
        type:String,
        required:[true,'Received null value for email'],
        unique:true,
        validate:{
            validator: (value)=>{
                return validator.isEmail(value)
            },
            message: ()=>{
                return 'invalid email format'
            }
        }
    },
    password:{
        type:String,
        required:[true,'Received null value for password'],
        minlength:6,
        maxlength:128
    },
    cardNo:{
        type:String
    },
    role :{
        type:String,
        enum : ['Admin','Customer','Agent'],
        required:[true,'Received null value for role']
    },
    createdAt :{
        type:Date,
        default:Date.now()
    },
    tokens:[
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ]
})

//before saving user into db , encrypt the password and store
//prehooks
userSchema.pre('save',function(next) {
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then((salt)=>{
                bcryptjs.hash(user.password,salt)
                    .then((encryptedPassword)=>{
                        user.password = encryptedPassword
                        next()
                    })
            })
    }
    else
        next()
})

//own static method
userSchema.statics.findByCredentials = function (email,password){
    const User = this
    
    return User.findOne({email})
        .then((user)=>{
            if(!user)
            { 

                return Promise.reject({error:'Invalid email or password'})

            }
            console.log(password,user.password)
            return bcryptjs.compare(password,user.password)
                .then((result)=>{
                    console.log(result)
                    if(result)
                    {
                        console.log("login worked")
                        return Promise.resolve(user)
                    }
                        
                    else
                    {
                     
                        return Promise.reject({error:'Invalid email or password'})
                    }
                })
        })
        .catch((err)=>{
            return Promise.reject(err)
        })
}

//Instance Method to generate Token
//arrow func if used here will change context of this
userSchema.methods.generateToken = function(){
    console.log("came eree")
    const user = this
    const tokenData = {
        _id:user._id,
        username:user.fullName,
        createdAt:Number(new Date())
    }

    const token = jwt.sign(tokenData,"jwt@321")
    user.tokens.push({token})

    return user.save()
        .then((user)=>{
            console.log("was here")
            return Promise.resolve(token)
        })
        .catch((err)=>{
            return Promise.reject(err)
        })
}

//For findingby token each time
userSchema.statics.findByToken=function(token){
    const User=this
    console.log(User)//Model {User}
    let tokenData
    try {
        tokenData = jwt.verify(token,"jwt@321")
        //jwt.verify - The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.
    }
    catch(err){
        return Promise.reject(err)
    }
    //below code should be in onlyAdmnAccess
    // if(User.role=="Admin")
    //     return User
    // else
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}

const User = mongoose.model('User',userSchema)

module.exports= User