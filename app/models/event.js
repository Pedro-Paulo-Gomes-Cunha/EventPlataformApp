const mongoose = require('mongoose')


const Schema = mongoose.Schema

const eventSchema = new Schema({
   
    eventCreatedOn : {
        type: Date,
        default: Date.now()
    },
    eventName : {
        type:String,
        required:[true, 'Received null value for event name']
    },
    eventDate:{
        type:String,
        required:[true, 'Received null value for event date']
    },
    eventTime:{
        type:String,
        required:[true, 'Received null value for event time']
    },
    eventType:{
        type:String,
        required:[true, 'Received null value for event type']
    },
    eventPlace:{
        type:String,
        required:[true, 'Received null value for event place']
    },
    eventAddress:{
        type:String,
        required:[true, 'Received null value for event address']
    },
    ticketCost:{ 
        type:Number,
        required:[true, 'Received null value for ticket cost']
    },
    maxParticipants:{
        type:Number,
        required:[true, 'Received null value for max participants']
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Received null value for user']
    },
    //code for below to be added in registration create controller
    registeredParticipants:{
        type:Number
    }
})

const Event = mongoose.model('Event',eventSchema)

module.exports = {
    Event
}