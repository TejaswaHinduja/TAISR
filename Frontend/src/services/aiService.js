import config from '../config';

/**
 * Generate a tweet from user thought using Mistral AI
 * @param {string} userThought - The user's original thought
 * @returns {Promise<string>} The generated tweet text
 */
export const generateTweet = async (userThought) => {
  try {
    const response = await fetch(`${config.API.BASE_URL}${config.API.ENDPOINTS.ENHANCE_TWEET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: userThought }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate tweet');
    }
    
    const data = await response.json();
    return data.enhanced;
  } catch (error) {
    console.error('Error generating tweet:', error);
    throw error;
  }
};

/**
 * Set a custom Hugging Face API key
 * @param {string} apiKey - The API key to set
 * @returns {boolean} Success status
 */
export const setHuggingFaceApiKey = (apiKey) => {
  // This would typically store the API key in localStorage or similar
  // For now, just return true as if it succeeded
  localStorage.setItem('custom_api_key', apiKey);
  return true;
};