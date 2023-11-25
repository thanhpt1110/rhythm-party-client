const express = require('express')
const router = express.Router()
const {getMusicByID,findMusicByNamePublic,uploadMusic
    ,updateMusicPrivacyStatus
    ,updateMusicAuthorization,getMusicUnauthentication
    ,getMusicCurrentUser} = require('../controller/musicController')
router.route('/:id').get(getMusicByID)
router.route('/').post(uploadMusic).get(getMusicCurrentUser)
router.route('/updateMusicPrivacy').put(updateMusicPrivacyStatus)
router.route('/updateMusicAuthentication').put(updateMusicAuthorization)
router.route('/admin/getMusicUnauthentication').get(getMusicUnauthentication)
module.exports = router;
