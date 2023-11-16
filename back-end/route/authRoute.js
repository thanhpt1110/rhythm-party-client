const express = require('express')
const passport = require('passport')
const router = express.Router();
require('dotenv').config();
require('../authentication/auth.js')
const CLIENT_URL = process.env.CLIENT_URL;
const {isLoggedIn,isAuthenticatedCallBack, isSuccessLogin, isFailureLogin, Logout} = require('../controller/authController.js')
router.route('/google').get(
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
router.route('/google/callback').get(
  passport.authenticate( 'google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/auth/failure'
}));
router.post("/user/login",
passport.authenticate('local',{
  successRedirect: CLIENT_URL,
  failureRedirect: "/auth/failure"
}))
router.route('/success').get(isLoggedIn,isSuccessLogin)
router.route('/failure').get(isFailureLogin)
router.route('/logout').get(Logout);
module.exports = router;