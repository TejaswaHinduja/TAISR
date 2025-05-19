const express = require('express');
const router=express.Router();
const authController=require('../controllers/authController');

router.get('/twitter',authController.twitterAuth);

router.get('/twitter/callback',authController.twitterCallback);
router.get('/user',authController.getCurrentUser);
router.post('/logout',authController.logout);

module.exports=router;