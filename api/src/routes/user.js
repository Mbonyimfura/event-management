const express = require('express')
const router = express.Router();

const {registerUser,loginUser,logoutUser,profileUser} = require('../controller/user') 
router.post('/register',registerUser )
router.post('/login', loginUser)
router.get('/profile',profileUser)
router.post('/logout',logoutUser)

module.exports =router