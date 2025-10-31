import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-striv-primary to-striv-accent text-white px-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Welcome to Striv</h1>
        <p className="text-lg md:text-xl text-gray-200">Your personal wellness companion. Achieve your fitness goals, follow personalized plans, and connect with expert trainers.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-lg bg-white text-striv-primary font-semibold hover:bg-gray-100 transition">Get Started</button>
          <button className="px-6 py-3 rounded-lg border border-white hover:bg-white hover:text-striv-primary transition">Learn More</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white text-striv-primary rounded-xl shadow-lg hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-2">Personalized Plans</h2>
          <p>Custom fitness & diet plans designed just for you.</p>
        </div>
        <div className="p-6 bg-white text-striv-primary rounded-xl shadow-lg hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-2">Live Classes</h2>
          <p>Join trainers live or watch on-demand sessions anytime.</p>
        </div>
        <div className="p-6 bg-white text-striv-primary rounded-xl shadow-lg hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-2">Trainer Chat</h2>
          <p>Connect 1-on-1 with certified trainers for guidance.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;