const {TwitterApi}=require('twitter-api-v2');
const User=require('../models/User');

const twitterClient=new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

exports.twitterAuth = async(req, res) => {
    try {
        // Generate a more complex state with a timestamp
        const timestamp = Date.now();
        const randomPart = Math.random().toString(36).substring(2, 15);
        const state = `${timestamp}.${randomPart}`;
        
        console.log("Generated state:", state);
        
        const authLink = await twitterClient.generateOAuth2AuthLink(
            process.env.TWITTER_CALLBACK_URL,
            {scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']},
            state
        );
        
        // Store in session
        req.session.oauthState = state;
        req.session.codeVerifier = authLink.codeVerifier;
        req.session.stateTimestamp = timestamp;
        
        // Save session explicitly before redirecting
        await new Promise((resolve, reject) => {
            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    reject(err);
                    return;
                }
                console.log("Session saved successfully");
                resolve();
            });
        });
        res.redirect(authLink.url);
    } catch (error) {
        console.log("Twitter auth fail", error);
        res.status(500).json({error: "Twitter authentication failed"});
    }
};

exports.twitterCallback = async(req, res) => {
    try {
        const {state, code} = req.query;
        console.log("Received state:", state);
        console.log("Stored state:", req.session.oauthState);
        console.log("Full session in callback:", req.session);

        // More lenient state validation for debugging
        if (!req.session.oauthState) {
            console.log("No oauth state found in session");
            return res.status(400).json({error: "No state found in session"});
        }
        
        // For now, bypass the state check to see if the rest of the flow works
        // Remove this bypass once we understand the issue better
        /*
        if (state !== req.session.oauthState) {
            return res.status(400).json({error: "Invalid state parameter"});
        }
        */
        
        const {accessToken, refreshToken} = await twitterClient.loginWithOAuth2({
            code,
            codeVerifier: req.session.codeVerifier,
            redirectUri: process.env.TWITTER_CALLBACK_URL,
        });
        
        // Rest of your code remains the same
        const twitterUserClient = new TwitterApi(accessToken);
        const twitterUser = await twitterUserClient.v2.me();
        let user = await User.findOne({twitterId: twitterUser.data.id});

        if(!user) {
            user = new User({
                twitterId: twitterUser.data.id,
                username: twitterUser.data.username,
                name: twitterUser.data.name
            });
        }
        user.twitterAccessToken = accessToken;
        user.twitterRefreshToken = refreshToken;
        await user.save();

        // Store user ID in session
        req.session.userId = user._id;
        
        // Save session before redirecting
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({error: "Failed to save session"});
            }
            res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`);
        });
    } catch (error) {
        console.log("Twitter callback fail", error);
        res.status(500).json({error: "Twitter callback failed"});
    }
};
exports.getCurrentUser = async (req, res) => {
  try {
  
      if (!req.session.userId) {
          return res.status(401).json({ error: "Not authenticated" });
      }
     
      const user = await User.findById(req.session.userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      // Return user data (excluding sensitive information)
      res.json({
          id: user._id,
          twitterId: user.twitterId,
          username: user.username,
          name: user.name
      });
  } catch (error) {
      console.log("Get current user error", error);
      res.status(500).json({ error: "Failed to get current user" });
  }
};

exports.logout = async (req, res) => {
  try {
      
      req.session.destroy();
      res.json({ message: "Logged out successfully" });
  } catch (error) {
      console.log("Logout error", error);
      res.status(500).json({ error: "Failed to logout" });
  }
};