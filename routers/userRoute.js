const express = require('express');
const { login, register, getUser, logoutUser } = require('../controllers/userController');
const {isAuth} = require('../middlewares/auth')
const router = express.Router();

router.route('/').post(register).get(isAuth,getUser)
router.route('/login').post(login)
router.route('/logout').get(isAuth,logoutUser)

// router.route('/find').get(findUser)

module.exports = router