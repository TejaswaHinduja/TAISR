import React, { useState } from 'react';
import FeatureCard from '../components/FeatureCard';
import useAuthStore from '../store/authStore';

function HomePage() {
  const [isHovering, setIsHovering] = useState(false);
  const { login } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-blue-700/10 blur-3xl top-20 -left-48"></div>
        <div className="absolute w-96 h-96 rounded-full bg-red-700/10 blur-3xl bottom-20 -right-48"></div>
      </div>

      <div className="container max-w-4xl mx-auto text-center z-10 space-y-12">
        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400 mb-6">
          TAISR
        </h1>

        {/* Twitter login button: centered on mobile, top-right on md+ */}
        <div className="w-full flex justify-center md:justify-end md:absolute md:top-6 md:right-6 z-20 mt-4 md:mt-0">
          <button onClick={login}
            className={`flex items-center justify-center space-x-3 px-6 py-3 rounded-lg bg-gradient-to-r 
            ${isHovering ? 'from-blue-600 to-blue-400' : 'from-blue-500 to-blue-600'} 
            text-white text-sm font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/50`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <span>Connect with Twitter</span>
          </button>
        </div>

        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Transform your thoughts into perfectly crafted tweets with our
          AI-powered tweet generator. Simple, seamless, direct to your Twitter.
        </p>

        {/* Feature cards with 3D sink effect */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
          <FeatureCard 
            iconColor="bg-gradient-to-br from-blue-500 to-blue-600"
            title="One-Click Generation"
            description="Share your thoughts and our AI transforms them into engaging tweets instantly."
            image={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <FeatureCard 
            iconColor="bg-gradient-to-br from-red-500 to-red-600"
            title="Direct to Twitter"
            description="Seamlessly posts to your account with your approval. No copying and pasting needed."
            image={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
          />
          <FeatureCard 
            iconColor="bg-gradient-to-br from-purple-500 to-purple-600"
            title="AI-Powered Magic"
            description="Advanced AI understands your style and crafts tweets that sound like you."
            image={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
          />
        </div>
      </div>

      {/* Floating demo element */}
      <div className="md:fixed md:bottom-6 md:left-6 bg-gray-800/70 p-4 rounded-lg shadow-lg border border-gray-700 max-w-md w-80 mx-auto md:mx-0 mt-10 md:mt-0 z-10">
      <p className="text-gray-400 text-sm">Your thought:</p>
      <p className="text-white mb-3">"I learned something interesting about quantum physics today"</p>
      <p className="text-gray-400 text-sm">Generated tweet:</p>
      <p className="text-blue-300">
    ✨ Just had my mind blown by quantum physics! Particles existing in multiple states until observed? Reality is stranger than fiction. #QuantumPhysics #MindExpanding
      </p>
      </div>

    </div>
  );
}

export default HomePage;
