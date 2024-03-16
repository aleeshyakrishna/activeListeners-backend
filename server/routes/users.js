var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

//get home page
router.get('/', userController.getHome);
// user registration
router.post('/user_registration',userController.registerUser)
router.post('/user_signin',userController.signinUser)
router.post('/send_login',userController.otpLogin)
router.post('/verify_otp',userController.verifyOtp)
router.post('/newsletter_subscription',userController.newsLetterSub)
router.post('/get_in_touch',userController.postGetInTouch)
module.exports = router;
