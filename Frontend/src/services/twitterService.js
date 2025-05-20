import config from '../config';

/**
 * Start the Twitter OAuth process
 * @returns {Promise<void>} Redirects to Twitter
 */
export const initiateTwitterAuth = async () => {
  try {
    window.location.href = `${config.API.BASE_URL}${config.API.ENDPOINTS.TWITTER_AUTH}`;
    return true;
  } catch (error) {
    console.error('Error initiating Twitter auth:', error);
    throw error;
  }
};

/**
 * Get the current user's Twitter information
 * @returns {Promise<Object|null>} User information or null
 */
export const getUserTwitterInfo = async () => {
  try {
    const response = await fetch(`${config.API.BASE_URL}${config.API.ENDPOINTS.TWITTER_USER}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        return null; // Not authenticated
      }
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get user info');
      } catch (jsonError) {
        // If response is not JSON, throw generic error
        throw new Error('Authentication failed. Please try again.');
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

/**
 * Post a tweet to Twitter
 * @param {string} tweetContent - The content to tweet
 * @returns {Promise<Object>} Response from Twitter
 */
export const postToTwitter = async (tweetContent) => {
  try {
    const response = await fetch(`${config.API.BASE_URL}${config.API.ENDPOINTS.POST_TWEET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: tweetContent }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to post tweet');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw error;
  }
};

/**
 * Log out the current Twitter user
 * @returns {boolean} Success status
 */
export const logoutTwitterUser = () => {
  // Clear any session cookies
  document.cookie.split(';').forEach(cookie => {
    document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
  return true;
};

/**
 * Check if user is authenticated with Twitter
 * @returns {boolean} Authentication status
 */
export const isTwitterAuthenticated = () => {
  // This would typically check a token in localStorage or similar
  // For now, just return false
  return false;
};