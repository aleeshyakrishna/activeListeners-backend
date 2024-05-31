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

//newsletter 
router.post('/newsletter_subscription',userController.newsLetterSub)
router.post('/submit-article',upload.single('articleContent'),userController.postArticle)

//get in touch
router.post('/get_in_touch',userController.postGetInTouch)

//user application - job
router.post('/application',upload.single('resume'),userController.applicatonForm)

//get my account
router.get('/my_profile/:id',authenticateToken.authenticateToken,userController.getProfile)

//edit user profile
router.put('/edit_my_profile/:id',authenticateToken.authenticateToken,userController.editProfile)

router.post('/delete_profile_pic/:id',authenticateToken.authenticateToken,userController.deleteProfilePic)

router.post('/add_profile_photo/:id',upload.single('profilePic'),userController.addProfilePic)

//delete user account
router.delete('/delete_account/:id',userController.deleteAccount)

//display all podcast
router.get('/podcast',userController.viewAllPodcast)

//get one particular podcast using id(the unique id - mongodb generated!!)
router.get('/one_podcast/:id',userController.viewOnePodcast)
//llll
//NGO joining form submission
router.post('/ngo_joining',userController.joinNgo)

//graduate joining form submission(if resume field needed..)
// router.post('/graduates_joining',upload.single('resume'),userController.joiningGraduates)
//no resume field 
router.post('/graduates_joining',userController.joiningCollege)

router.post('/psychologist_joining',upload.fields([{ name: 'image' },
{ name: 'resume' }]),userController.joinPsychologist)

router.post('/addGender/:id',userController.addGender)

router.post('/addMobile/:id',userController.addMobile)

router.post('/createPassword/:id',userController.createPassword)

router.post('/updatePassword/:id',userController.updatePassword)

router.post('/forgotPassword',userController.forgotPassword)

router.post('/getintouch_griefSupport',userController.griefSupportGetInTouch)

router.post('/create-ccavenue-order',authenticateToken.authenticateToken,userController.postCheckout)

// router.post('/webhook',userController.postEvents)
module.exports = router;
