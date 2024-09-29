var bcrypt = require('bcryptjs');

let hashPass=""

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("secret", salt, function(err, hash) {
        hashPass=hash
        console.log(hashPass)
        bcrypt.compare("secret12",hashPass)
        .then((result)=>{
            console.log(result)//false
        })
        bcrypt.compare("secret",hashPass)
        .then((result)=>{
            console.log(result)//true
        })
    })
})





