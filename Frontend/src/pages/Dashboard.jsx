import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useTweetStore from '../store/tweetStore';

function Dashboard() {
  const navigate = useNavigate();
  const [thought, setThought] = useState('');
  
  // Auth store
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  
  // Tweet store
  const { 
    originalThought, 
    enhancedTweet, 
    tweetHistory,
    isEnhancing, 
    isPosting, 
    error,
    setOriginalThought,
    enhanceTweet,
    postTweet,
    fetchTweetHistory
  } = useTweetStore();
  
  // Check authentication on load
  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await checkAuth();
      if (!user) {
        navigate('/');
      } else {
        fetchTweetHistory();
      }
    };
    
    checkAuthentication();
  }, []);
  
  // Handle thought input
  const handleThoughtChange = (e) => {
    setThought(e.target.value);
    setOriginalThought(e.target.value);
  };
  
  // Handle enhance button
  const handleEnhance = async () => {
    await enhanceTweet(thought);
  };
  
  // Handle post button
  const handlePost = async () => {
    await postTweet();
    setThought('');
  };
  
  if (!isAuthenticated) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">TAISR Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">@{user?.username}</span>
            <button 
              onClick={() => useAuthStore.getState().logout()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
            <button 
              className="ml-4 underline" 
              onClick={() => useTweetStore.getState().clearError()}
            >
              Dismiss
            </button>
          </div>
        )}
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Create a Tweet</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Your Thought</label>
              <textarea
                value={thought}
                onChange={handleThoughtChange}
                className="w-full bg-gray-700 text-white rounded-lg p-3 min-h-[100px]"
                placeholder="What's on your mind?"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleEnhance}
                disabled={!thought || isEnhancing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isEnhancing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enhancing...
                  </>
                ) : 'Enhance with AI'}
              </button>
            </div>
            
            {enhancedTweet && (
              <div className="mt-6">
                <label className="block text-gray-300 mb-2">Enhanced Tweet</label>
                <div className="bg-gray-700 rounded-lg p-4 text-white">
                  {enhancedTweet}
                </div>
                <div className="mt-4">
                  <button
                    onClick={handlePost}
                    disabled={isPosting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isPosting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Posting...
                      </>
                    ) : 'Post to Twitter'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {tweetHistory.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Tweet History</h2>
            <div className="space-y-4">
              {tweetHistory.map((tweet) => (
                <div key={tweet.tweetId} className="border-b border-gray-700 pb-4 last:border-0">
                  <p className="text-white">{tweet.content}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-sm">
                      {new Date(tweet.createdAt).toLocaleString()}
                    </span>
                    {tweet.tweetUrl && (
                      <a 
                        href={tweet.tweetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm hover:underline"
                      >
                        View on Twitter
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;