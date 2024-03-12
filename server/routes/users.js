var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

//get home page
router.get('/', userController.getHome);
// user registration
router.post('/register',userController.registerUser)


module.exports = router;
