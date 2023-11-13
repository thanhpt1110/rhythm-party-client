const express = require('express')
const passport = require('passport')
const router = express.Router();
require('dotenv').config();
require('../authentication/auth.js')
const CLIENT_URL = process.env.CLIENT_URL;
const {isLoggedIn,isAuthenticatedCallBack, isSuccessLogin, isFailureLogin, Logout} = require('../controller/googleAuthController.js')
router.route('').get(
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.route('/callback').get(
  passport.authenticate( 'google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/auth/google/failure'
}));
router.route('/success').get(isLoggedIn,isSuccessLogin)
router.route('/failure').get(isFailureLogin)
router.route('/logout').get(Logout);
module.exports = router;