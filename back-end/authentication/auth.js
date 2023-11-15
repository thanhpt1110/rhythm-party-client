const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../model/UserModel')
const User1 = require('../entity/User')
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const existingUser = await User.findOne({ googleID: profile.id , accountType: User1.TYPE_GOOGLE});
    if(existingUser===null)
    {
        const user = await User.create({
            googleID: profile.id,
            displayName: profile.displayName,
            email: profile.email,
            avatar: profile.picture,
            accountType: User1.TYPE_GOOGLE,
            gender: null
        })
        console.log("first Create")
        done(null,user)
    }
    else{
        done(null,existingUser);
    }

   
  }
));
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})