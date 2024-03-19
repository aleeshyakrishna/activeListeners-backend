var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const authentication = require("../middlewares/userAuth")

//get home page
router.get('/', userController.getHome);
// user registration
router.post('/user_registration',userController.registerUser)
router.post('/user_signin',userController.signinUser)
router.post('/send_login',userController.otpLogin)
router.post('/verify_otp',userController.verifyOtp)
router.post('/newsletter_subscription',userController.newsLetterSub)
router.post('/get_in_touch',userController.postGetInTouch)
router.post('/application',upload.single('resume'),userController.applicatonForm)
// router.post('/contact_us',userController.contactUs)
router.get('/my_profile/:id',userController.getProfile)
router.put('/edit_my_profile/:id',userController.editProfile)
router.delete('/delete_account/:id',userController.deleteAccount)
module.exports = router;
