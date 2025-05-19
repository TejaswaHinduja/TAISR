import { create } from 'zustand'
import { ai, twitter } from '../api'

const useTweetStore = create((set, get) => ({
  originalThought: '',
  enhancedTweet: '',
  tweetHistory: [],
  isEnhancing: false,
  isPosting: false,
  error: null,
  
  // Set the original thought
  setOriginalThought: (thought) => set({ originalThought: thought }),
  
  // Enhance a tweet using AI
  enhanceTweet: async (thought) => {
    set({ isEnhancing: true, error: null })
    try {
      const response = await ai.generateTweet(thought || get().originalThought)
      set({ enhancedTweet: response, isEnhancing: false })
      return response
    } catch (error) {
      set({ error: error.message, isEnhancing: false })
      return null
    }
  },
  
  // Post a tweet to Twitter
  postTweet: async (content) => {
    set({ isPosting: true, error: null })
    try {
      const tweetContent = content || get().enhancedTweet
      const response = await twitter.postTweet(tweetContent)
      
      // Add to history
      const newTweet = {
        content: tweetContent,
        createdAt: new Date(),
        tweetId: response.tweetId,
        tweetUrl: response.tweetUrl
      }
      
      set(state => ({
        tweetHistory: [newTweet, ...state.tweetHistory],
        isPosting: false,
        originalThought: '',
        enhancedTweet: ''
      }))
      
      return response
    } catch (error) {
      set({ error: error.message, isPosting: false })
      return null
    }
  },
  
  // Fetch tweet history
  fetchTweetHistory: async () => {
    try {
      const response = await fetch('/api/tweets/history', {
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok) {
        set({ tweetHistory: data })
        return data
      } else {
        set({ error: data.error })
        return []
      }
    } catch (error) {
      set({ error: error.message })
      return []
    }
  },
  
  // Clear any errors
  clearError: () => set({ error: null })
}))

export default useTweetStore