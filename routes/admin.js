var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

// router.post('/admin_login',adminController.adminLogin)
router.post('/login', adminController.adminLogin);
router.post('/post_psychologyst',adminController.addPsychologyst)
router.get('/view_psychologyst',adminController.viewPsychologyst)
router.get('/viewOne_Psychologyst/:_id', adminController.viewPsychologyst);
router.get('/view_all_users',adminController.findAllUsers)
router.get('/viewOne_user/:_id',adminController.viewUser)
router.get('/viewHiring',adminController.viewHiring)
module.exports = router;
