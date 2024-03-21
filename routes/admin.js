var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

// router.post('/admin_login',adminController.adminLogin)
router.post('/login', adminController.adminLogin);
router.post('/post_psychologyst',adminController.addPsychologyst)
router.get('/view_psychologyst',adminController.viewPsychologyst)
router.get('/viewOne_Psychologyst/:_id', adminController.viewPsychologyst);
router.get('/view_all_users',adminController.findAllUsers)
router.get('/viewOne_user/:_id',adminController.viewUser)
router.get('/viewHiring',adminController.viewHiring)
//add podcast
router.post(
                '/add_podcast',upload.fields([{ name: 'thumbnail' },
                { name: 'source' }]),
                adminController.addPodcast
            )
router.get("/view_all_podcast",adminController.viewAllPodcast)
module.exports = router;
