require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const url = process.env.CONNECTION_STRING
const port = process.env.PORT
const connect = async ()=>{
    try{
        await mongoose.connect(url)
        console.log('Connect to mongoDB')
    }
    catch(error){
        console.log(error)
    }   
}
connect()
app.listen(port,()=>{console.log(`server run on port ${port}`)})