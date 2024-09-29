const mongoose = require('mongoose')

const Schema = mongoose.Schema

const registrationSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Received null value for user']
    },
    event : {
        type:Schema.Types.ObjectId,
        ref:'Event',
        required:[true, 'Received null value for event']
    },
    registrationDate:{
        type: Date,
        default: Date.now()
    },
    registrationType:{
        type:String,
        enum : ['Self','Group','Corporate','Others']
    },
    noOfTickets:{
        type:Number,
        default:1
    },
    estimateCost:{ //we need to calculate costOfEvent * noOfTickets
        type:Number
    },
    registrationName:{
        type:String
    }
})

const Registration = mongoose.model('Registration',registrationSchema)

module.exports = {
    Registration
}