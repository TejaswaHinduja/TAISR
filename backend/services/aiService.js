const axios = require('axios');


const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';


exports.handleRateLimiting = async (fn, maxRetries = 3) => {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await fn();
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Rate limit hit, wait and retry
          const waitTime = (retries + 1) * 1000; // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, waitTime));
          retries++;
        } else {
          throw error;
        }
      }
    }
    throw new Error('Rate limit exceeded after multiple retries');
  };
exports.enhanceTweet = async (content) => {
  try {

    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-small-latest', 
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that improves tweets to make them more engaging while maintaining the original meaning. Keep responses under 280 characters.'
          },
          {
            role: 'user',
            content: `Improve this tweet: "${content}"`
          }
        ],
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Mistral API error:', error);
    throw new Error('Failed to enhance tweet with AI');
  }
};