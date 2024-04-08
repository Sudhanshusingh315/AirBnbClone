const router = require('express').Router();
const userController = require('../Controller/useController');

router.post('/',userController.loginUser)
router.post('/register',userController.register)

exports.router =router;