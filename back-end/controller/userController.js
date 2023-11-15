require('dotenv').config();
const User = require('../model/UserModel')
const asyncHandler = require('express-async-handler')
const getUser = asyncHandler (async(req,res)=>{
    if(req.isAuthenticated())
    {
        User.find()
        res.status(200).json(req.user)
    }
    else
    {
        res.status(401).json({message: "Unauthorize"});
    } 
})
const getUserByID = asyncHandler(async(req,res)=>{
    
})
module.exports = {getUser}