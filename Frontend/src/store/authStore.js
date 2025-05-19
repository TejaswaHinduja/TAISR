import { create } from 'zustand'
import { twitter } from '../api'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Check if user is already authenticated
  checkAuth: async () => {
    set({ isLoading: true })
    try {
      const user = await twitter.getCurrentUser()
      set({ user, isAuthenticated: !!user, isLoading: false })
      return user
    } catch (error) {
      set({ error: error.message, isLoading: false })
      return null
    }
  },
  
  // Login with Twitter
  login: async () => {
    set({ isLoading: true })
    try {
      await twitter.login()
      // The actual auth happens in a redirect, so we don't set user here
      set({ isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },
  
  // Logout
  logout: () => {
    twitter.logout()
    set({ user: null, isAuthenticated: false })
  },
  
  // Clear any errors
  clearError: () => set({ error: null })
}))

export default useAuthStore