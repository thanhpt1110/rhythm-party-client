require('dotenv').config();
const User = require('../entity/User.js')
const passport = require('passport')
const isLoggedIn = (req,res,next)=>{
    req.user ? next(): res.sendStatus(401);
}
const isAuthenticatedCallBack = ()=>{}
const isSuccessLogin = (req,res)=>{
    if(req.isAuthenticated()){
        const userAccount = new User(req.user.id, req.user.displayName, req.user.picture, req.user.email, User.TYPE_GOOGLE,true);
        res.status(200).json({
          success: true,
          message: "Sucesss",
          user: userAccount
        })
    }
}
const isFailureLogin = (req,res)=>{
    
    res.status(401).json({
      success: false,
      message: 'failure'
    })
    res.redirect(CLIENT_URL)
};
const Logout =(req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect(CLIENT_URL); // Điều hướng đến trang chính hoặc trang đăng nhập
    });
  }
  module.exports = {isLoggedIn, isAuthenticatedCallBack, isSuccessLogin, isFailureLogin, Logout};