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
//user login
router.post('/user_signin',userController.signinUser)
//otp login
router.post('/send_login',userController.otpLogin)
//otp verification
router.post('/verify_otp',userController.verifyOtp)
//newslettr 
router.post('/newsletter_subscription',userController.newsLetterSub)
//get in touch
router.post('/get_in_touch',userController.postGetInTouch)
router.post('/application',upload.single('resume'),userController.applicatonForm)
// router.post('/contact_us',userController.contactUs)
router.get('/my_profile/:id',userController.getProfile)
router.put('/edit_my_profile/:id',userController.editProfile)
router.delete('/delete_account/:id',userController.deleteAccount)
router.get('/podcast',userController.viewAllPodcast)
router.get('/one_podcast/:id',userController.viewOnePodcast)
module.exports = router;
