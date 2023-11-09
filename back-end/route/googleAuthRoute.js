const express = require('express')
const router = express.Router();
require('../auth.js')
const passport = require('passport')
const isLoggedIn = (req,res,next)=>{
    req.user ? next(): res.sendStatus(401);
}
router.route('/').get(
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.route('/callback').get(
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/protected',
        failureRedirect: '/auth/google/failure'
}));
router.route('/protected').get(isLoggedIn,(req,res)=>{
    if(req.isAuthenticated()){
        const googleAccount = req.user;
        console.log(googleAccount)
        res.send(googleAccount.displayName  )
    }
})
router.route('/failure').get((req,res)=>{
    res.json({loginStatus: "failed"})
})
router.route('/logout').get( (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/'); // Điều hướng đến trang chính hoặc trang đăng nhập
    });
  });
module.exports = router;