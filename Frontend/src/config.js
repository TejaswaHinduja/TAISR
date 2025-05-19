/**
 * Application configuration
 */
const config = {
    // API endpoints
    API: {
      BASE_URL: import.meta.env.VITE_API_BASE_URL,
      ENDPOINTS: {
        TWITTER_AUTH: '/api/auth/twitter',
        TWITTER_CALLBACK: '/api/auth/twitter/callback',
        TWITTER_USER: '/api/auth/user',
        ENHANCE_TWEET: '/api/tweets/enhance',
        POST_TWEET: '/api/tweets/post',
        TWEET_HISTORY: '/api/tweets/history'
      }
    },
    
    // Application configuration
    APP_CONFIG: {
      // Feature flags
      FEATURES: {
        USE_MOCK_SERVICES: false,  // Set to true to use mock services instead of real APIs
        ALLOW_CUSTOM_API_KEYS: false  // Set to true to allow users to provide their own API keys
      },
      
      // UI configuration
      UI: {
        MAX_TWEET_LENGTH: 280,
        DEFAULT_THEME: 'dark'
      }
    },
    
    // Environment-specific settings
    ENV: {
      IS_PRODUCTION: process.env.NODE_ENV === 'production',
      IS_DEVELOPMENT: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
    }
  };
  
  export default config;