const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../model/UserModel')
const asyncHandler = require('express-async-handler')
const User1 = require('../entity/User')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
    passReqToCallback   : true
  },
  asyncHandler (async function(request, accessToken, refreshToken, profile, done) {
    try{
        const existingUser = await User.findOne({ googleID: profile.id , accountType: User1.TYPE_GOOGLE});
        if(existingUser===null)
        {
            const user = await User.create({
                googleID: profile.id,
                displayName: profile.displayName,
                email: profile.email,
                avatar: profile.picture,
                accountType: User1.TYPE_GOOGLE,
                gender: null,
                role: "user"
            })
            console.log("first Create")
            done(null,user)
        }
        else{
            done(null,existingUser);
        }
    }
    catch(Exception)
    {
        console.log(Exception)
        done(null,profile)
    }
  })
));
passport.use(new LocalStrategy(
    asyncHandler( async function(username, password, done) {
        const existingUser = await User.findOne({username: username, accountType: User1.TYPE_LOCAL_ACCOUNT});
        console.log(existingUser)
        if(existingUser&& (await bcrypt.compare(password, existingUser.password)))
            return done(null, existingUser)
        else
            return done(null,false)
    }
  )));
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})