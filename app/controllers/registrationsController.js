const {Registration} = require('../models/registration')
const {Event}=require('../models/event')
// const _ = require('lodash')

module.exports.list=(req,res)=>{
    console.log(req.user.fullName,req.user.role)
    //below condition is because admin should be given permission to see all registrations
    if(req.user.role=="Admin"){
        Registration.find()//.populate('user').populate('event')
        .then(registrations=>{
            res.json(registrations)
        })
        .catch(err=>{
            res.json({error:err})
        })
    }
    else
    {
        Registration.find({ user: req.user._id })//.populate('user').populate('event')
        .then(registrations=>{
            res.json(registrations)
        })
        .catch(err=>{
            res.json({error:err})
        })
    }

}

module.exports.create=(req,res)=>{
    if(req.user.role=="Customer")
    {
        const {body}=req
    //console.log(body.event)
        Event.findOne({_id:body.event})
                    .then(event=>{
                        //should include code to count registeredparticipants count always

                        // console.log(event.ticketCost)
                        const estimateCost = event.ticketCost * body.noOfTickets
                        body.estimateCost=estimateCost
                        // console.log("here",body)
                            const registration = new Registration(body)
                            registration.user=req.user._id
                            registration.save()
                                    .then(registration=>{
                                        res.json(registration)
                                        console.log("after stuffs")
                                    })
                                    .catch(err=>{
                                        res.json({error:err})
                                    })
                    })
                    .catch(err=>{
                        res.json({error:err})
                    })
    }
    else
    {
        res.json({})
    }
    
}

module.exports.show=(req,res)=>{
    const {id}=req.params
    //shouldn't admin also be able to see? - yet to code
    Registration.findOne({_id:id,user:req.user._id})//.populate('user').populate('event')
    .then(registration=>{
        if(registration)
        res.json(registration)
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
    Registration.findOneAndUpdate({ user: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
    //Registration.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then(registration=>{
        if(registration){
            res.json(registration)
        }
        else {
            res.json({})
        }
    })
    .catch(error=>{
        res.json({error:err})
    })
}

module.exports.destroy=(req,res)=>{
    const {id}=req.params
    //Registration.findByIdAndDelete(id)

    //new features like event agent can delete any registration at later point of time needs to be thought of and coded
    
    Registration.findOneAndDelete({ user: req.user._id, _id: id })
    .then(registration=>{
        if(registration)
            res.json(registration)
        else
            res.json({})
    })
    .catch(err=>{
        res.json({error:err})
    })
}