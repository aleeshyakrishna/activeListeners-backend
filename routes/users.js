var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

var userController = require('../controllers/userController')
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const authenticateToken = require("../middlewares/userAuth")

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

//user application - job
router.post('/application',upload.single('resume'),userController.applicatonForm)

//get my account
router.get('/my_profile/:id',authenticateToken.authenticateToken,userController.getProfile)

//edit user profile
router.put('/edit_my_profile/:id',userController.editProfile)

router.post('/add_profile_photo/:id',upload.single('profilePic'),userController.addProfilePic)

//delete user account
router.delete('/delete_account/:id',userController.deleteAccount)

//display all podcast
router.get('/podcast',userController.viewAllPodcast)

//get one particular podcast using id(the unique id - mongodb generated!!)
router.get('/one_podcast/:id',userController.viewOnePodcast)

//NGO joining form submission
router.post('/ngo_joining',userController.joinNgo)

//graduate joining form submission(if resume field needed..)
// router.post('/graduates_joining',upload.single('resume'),userController.joiningGraduates)
//no resume field 
router.post('/graduates_joining',userController.joiningGraduates)


module.exports = router;
