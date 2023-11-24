require('dotenv').config();
const User = require('../model/UserModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const UserTable = require('../entity/UserTable')
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
    const user = await User.findById(req.params.id);
    console.log(user);
    res.json(user)
})
const updateUserById = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    //console.log(req)
    if(req.isAuthenticated())
    {
        if(id === req.user._id || req.user.role === "admin")
        {
            try {
                const { username, password, displayName, googleID, facebookID, email, gender, birthday, avatar, accountType, role, isAvailable } = req.body;
                const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
        
                if (username != null) {
                    user.username = username;
                }
        
                if (password != null) {
                    user.password = password;
                }
        
                if (displayName != null) {
                    user.displayName = displayName;
                }
        
                if (googleID != null) {
                    user.googleID = googleID;
                }
        
                if (facebookID != null) {
                    user.facebookID = facebookID;
                }
        
                if (email != null ) {
                    user.email = email;
                }
        
                if (gender != null) {
                    user.gender = gender;
                }
        
                if (birthday != null) {
                    user.birthday = birthday;
                }
        
                if (avatar != null) {
                    user.avatar = avatar;
                }
        
                if (accountType !== undefined) {
                    user.accountType = accountType;
                }
        
                if (role !== undefined) {
                    user.role = role;
                }
        
                if (isAvailable !== undefined) {
                    user.isAvailable = isAvailable;
                }
                await user.save();
                res.status(200).json({message: "success", user: user});
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
        else
            res.status(401).json({message: "Unauthorize role"})
    }
    else
    {
        res.status(401).json({message: "Unauthorize"})
    }
})
const createNewAccount = asyncHandler(async(req,res) =>{
    console.log(req.body)
    const {email, password, displayName} = req.body;
    const existingUser = await User.findOne({username: email})
    if(existingUser!==null)
    {
        res.status(200).json({isSuccess: false, message: "Account already existed"})
    }
    else
    {
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            displayName: displayName,
            username: email,
            password: hashedPassword,
            email: email,
            avatar: null,
            accountType: UserTable.TYPE_LOCAL_ACCOUNT,
            gender: null,
            role: "user"
        })
        console.log("first Create")
        res.json({isSuccess: true, message: "Success", user: user})
    }
})
module.exports = {getUser,getUserByID,updateUserById,createNewAccount}