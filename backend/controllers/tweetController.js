const {TwitterApi} = require('twitter-api-v2');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const aiService = require('../services/aiService');

exports.enhanceTweet = async (req, res) => {
    try {
        const {content}=req.body;
        if(!content){
            return res.status(400).json({message:'Tweet content is required'});
        }
        const enhancedTweet=await aiService.enhanceTweet(content);
        res.json({original:content,enhanced:enhancedTweet});

    } catch (error) {
        console.log("Enhance failed",error);
        res.status(500).json({message:'Enhancement failed'});
        
    }
};

exports.postTweet = async(req, res) => {
    try {
        if(!req.session.userId){
            return res.status(401).json({message:'Unauthorized'});
        }
        const {content} = req.body;
        if(!content){
            return res.status(400).json({message:'Tweet content is required'});
        }
        const user = await User.findById(req.session.userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const twitterClient = new TwitterApi(
            user.twitterAccessToken,
        )

        const tweet = await twitterClient.v2.tweet(content);
        const newTweet = new Tweet({
            userId: user._id,
            tweetId: tweet.data.id,
            content,
            createdAt: new Date(),
        })
        await newTweet.save();
        res.json({
            success: true,
            tweetId: tweet.data.id,
            tweetUrl: `https://twitter.com/${user.username}/status/${tweet.data.id}`
        });

    } catch (error) {
        console.log("Post failed", error);
        // Add proper error response
        res.status(500).json({
            success: false,
            message: 'Failed to post tweet',
            error: error.message
        });
    }
}
exports.getTweetHistory = async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
      
      const tweets = await Tweet.find({ userId: req.session.userId })
        .sort({ createdAt: -1 })
        .limit(20);
      
      res.json(tweets);
    } catch (error) {
      console.error('Get tweet history error:', error);
      res.status(500).json({ error: 'Failed to get tweet history' });
    }
  };


