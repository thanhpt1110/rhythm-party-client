const express = require('express')
const router = express.Router();
require('dotenv').config();
require('../auth.js')
const passport = require('passport')
const isLoggedIn = (req,res,next)=>{
    req.user ? next(): res.sendStatus(401);
}
const CLIENT_URL = process.env.CLIENT_URL;
router.route('').get(
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.route('/callback').get(
    passport.authenticate( 'google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/google/failure'
}));
router.route('/success').get(isLoggedIn,(req,res)=>{
    if(req.isAuthenticated()){
        res.status(200).json({
          success: true,
          message: "Sucesss",
          user: req.user
        })
    }
})
router.route('/failure').get((req,res)=>{
    res.status(401).json({
      success: false,
      message: 'failure'
    })
    res.redirect(CLIENT_URL)
})
router.route('/logout').get( (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect(CLIENT_URL); // Điều hướng đến trang chính hoặc trang đăng nhập
    });
  });
module.exports = router;