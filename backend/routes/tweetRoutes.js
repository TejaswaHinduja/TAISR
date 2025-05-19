const express=require("express");
const router=express.Router();
const tweetController=require('../controllers/tweetController');

router.post('/enhance',tweetController.enhanceTweet);

router.post('/post',tweetController.postTweet);

module.exports=router;