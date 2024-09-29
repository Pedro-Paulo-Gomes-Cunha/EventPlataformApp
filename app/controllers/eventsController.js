const {Event} = require('../models/event')

module.exports.list=(req,res)=>{
    console.log(req.user.fullName,req.user.role)
    //below condition is because admin & customer should be given permission to see all events
    if(req.user.role=="Admin" || req.user.role=="Customer"){
        Event.find()
        .then(events=>{
            res.json(events)
        })
        .catch(err=>{
            res.json({error:err})
        })
    }
    else
    {
        Event.find({ user: req.user._id })
        .then(events=>{
            res.json(events)
        })
        .catch(err=>{
            res.json({error:err})
        })
    }
}

module.exports.create=(req,res)=>{
    const {body}=req
    const event = new Event(body)
    
    //below line is because user need not pass his id when he creates event - that is wrong so now system will tag relevant event under the user
    event.user=req.user._id
        event.save()
            .then(event=>{
                res.json(event)
            })
            .catch(err=>{
                res.json({error:err})
            })

}

module.exports.show=(req,res)=>{
    const {id}=req.params
    if(req.user.role=="Admin"){
        Event.findOne({
            _id:id
        })
        .then(event=>{
            if(event)
            res.json(event)
            else
            res.json({})
        })
        .catch(err=>{
            res.json({error:err})
        })
    }
    else{
        Event.findOne({
            user: req.user._id,
            _id: id
        })
        .then(event=>{
            if(event)
            res.json(event)
            else
            res.json({})
        })
        .catch(err=>{
            res.json({error:err})
        })
    }
    
}

module.exports.update=(req,res)=>{
    const {id}=req.params
    const {body}=req
    Event.findOneAndUpdate({ user: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
    .then(event=>{
        if(event){
            res.json(event)
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
    Event.findOneAndDelete({ user: req.user._id, _id: id })
    .then(event=>{
        if(event)
            res.json(event)
        else
            res.json({})
    })
    .catch(err=>{
        res.json({error:err})
    })
}