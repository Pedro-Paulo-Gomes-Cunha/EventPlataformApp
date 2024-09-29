const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');

mongoose.Promise=global.Promise

const url = 'mongodb+srv://pedrogomesskeell:0XLmXlneb42Jpd6E@cluster0.236lx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01'

const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

client.connect()
.then(()=>{
    console.log("connected to db")
})
.catch((error)=>{
    console.log("error connecting",error)
})
mongoose.connect(url,{ useNewUrlParser: true ,useUnifiedTopology:true, useCreateIndex:true});
module.exports=mongoose
