var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')

// router.post('/admin_login',adminController.adminLogin)
router.post('/login', adminController.adminLogin);
router.post('/post_psychologyst',adminController.addPsychologyst)
router.get('/view_psychologyst',adminController.viewPsychologyst)
module.exports = router;
