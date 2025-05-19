
import config from './config';
import * as aiService from './services/aiService';
import * as twitterService from './services/twitterService';

// AI API Methods
export const ai = {
  /**
   * Generate a tweet from user thought using Mistral AI
   * @param {string} userThought - The user's original thought
   * @returns {Promise<string>} The generated tweet text
   */
  generateTweet: async (userThought) => {
    return aiService.generateTweet(userThought);
  },
  
  /**
   * Set a custom Hugging Face API key
   * @param {string} apiKey - The API key to set
   * @returns {boolean} Success status
   */
  setApiKey: (apiKey) => {
    return aiService.setHuggingFaceApiKey(apiKey);
  }
};

// Twitter API Methods
export const twitter = {
  /**
   * Start the Twitter OAuth process
   * @returns {Promise<Object>} User information if successful
   */
  login: async () => {
    return twitterService.initiateTwitterAuth();
  },
  
  /**
   * Get the current user's Twitter information
   * @returns {Promise<Object|null>} User information or null
   */
  getCurrentUser: async () => {
    return twitterService.getUserTwitterInfo();
  },
  
  /**
   * Post a tweet to Twitter
   * @param {string} tweetContent - The content to tweet
   * @param {string} accessToken - The user's Twitter access token
   * @returns {Promise<Object>} Response from Twitter
   */
  postTweet: async (tweetContent, accessToken) => {
    return twitterService.postToTwitter(tweetContent, accessToken);
  },
  
  /**
   * Handle the Twitter OAuth callback
   * @param {string} oauthToken - OAuth token from callback
   * @param {string} oauthVerifier - OAuth verifier from callback
   * @returns {Promise<Object>} User information
   */
  handleCallback: async (oauthToken, oauthVerifier) => {
    return twitterService.handleTwitterCallback(oauthToken, oauthVerifier);
  },
  
  /**
   * Log out the current Twitter user
   * @returns {boolean} Success status
   */
  logout: () => {
    return twitterService.logoutTwitterUser();
  },
  
  /**
   * Check if user is authenticated with Twitter
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    return twitterService.isTwitterAuthenticated();
  }
};

// Utility methods
export const utils = {
  /**
   * Check if the application is using mock services
   * @returns {boolean} Whether mocks are in use
   */
  isUsingMocks: () => {
    return config.APP_CONFIG.FEATURES.USE_MOCK_SERVICES;
  },
  
  /**
   * Check if custom API keys are allowed
   * @returns {boolean} Whether custom keys are allowed
   */
  allowsCustomApiKeys: () => {
    return config.APP_CONFIG.FEATURES.ALLOW_CUSTOM_API_KEYS;
  },
  
  /**
   * Get the Twitter character limit
   * @returns {number} The maximum allowed tweet length
   */
  getTweetCharLimit: () => {
    return config.TWITTER_CONFIG.MAX_TWEET_LENGTH;
  }
};

export default {
  ai,
  twitter,
  utils
};