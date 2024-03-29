var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

// router.post('/admin_login',adminController.adminLogin)
router.post('/login', adminController.adminLogin);

router.post('/post_psychologyst',upload.fields([{ name: 'image' },
            { name: 'resume' }]),adminController.addPsychologyst);

router.get('/view_psychologyst',adminController.viewPsychologysts);

router.get('/viewOne_Psychologyst/:_id', adminController.viewPsychologyst);

router.get('/view_all_users',adminController.findAllUsers);

router.get('/viewOne_user/:_id',adminController.viewUser);

router.get('/viewHiring',adminController.viewHiring);

//add podcast
router.post(
                '/add_podcast',upload.fields([{ name: 'thumbnail' },
                { name: 'source' }]),
                adminController.addPodcast
            );

router.get("/view_all_podcast",adminController.viewAllPodcast);

router.get("/view_one_application/:_id",adminController.viewOneAppln);

router.get('/total_psychologist',adminController.viewPsychologystsCount)

router.get('/total_collegeGraduate',adminController.viewCollegeGraduates)

router.get('/total_ngo_count',adminController.viewNGO)

router.get('/registeredUser-count',adminController.findUserCount)




module.exports = router;
