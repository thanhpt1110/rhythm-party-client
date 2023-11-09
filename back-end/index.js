require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const url = process.env.CONNECTION_STRING
const port = process.env.PORT
const passport = require('passport')
const session = require('express-session')
require('./auth.js')


app.use(session({
    secret: '2',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth/google',require('./route/googleAuthRoute.js'))
const connect = async ()=>{
    try{
        await mongoose.connect(url)
        console.log('Connect to mongoDB')
    }
    catch(error){
        console.log(error)
    }   
}
app.listen(port,()=>{console.log(`server run on port ${port}`)})
