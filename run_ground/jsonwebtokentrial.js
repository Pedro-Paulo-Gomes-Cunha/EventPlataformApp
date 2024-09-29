const jwt = require('jsonwebtoken')
const tokenData = {
    id : 2,
    name :' priyanka'
}

const generatedToken = jwt.sign(tokenData,"jwt@123")
console.log(generatedToken)

try {
    const backtokenData = jwt.verify(generatedToken,"abc")
    console.log("verification passed1")
}
catch {
    console.log("verification failed1")
}

try {
    const backtokenData = jwt.verify(generatedToken,"jwt@123")
    console.log("verification passed2")
}
catch {
    console.log("verification failed2")
}



