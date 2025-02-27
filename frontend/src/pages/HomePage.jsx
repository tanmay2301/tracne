import { Link } from "react-router-dom";
import { ArrowRight, Camera, LineChart as ChartLineUp, Calendar } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow "> {/* Added padding to account for the larger navbar */}
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50 to-blue-50 py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-7xl pt-15 font-extrabold text-teal-800 sm:text-7xl md:text-8xl">Tired of Breakouts?</h1>
            <p className="mt-5 text-2xl italic text-teal-600 sm:mt-6">Well, we've got one that might just work in your favor. Yes, you read that right!</p>
            <p className="mt-5 max-w-lg mx-auto text-xl text-gray-500 sm:text-2xl md:mt-6 md:text-2xl md:max-w-4xl">
              Breakout in Personalized Acne Tracking - <span className="text-teal-700 font-extrabold text-3xl italic">tracne</span>
            </p>
            <div className="mt-14">
              <Link to="/about">
                <button className="inline-flex items-center my-4 px-8 py-4 border border-transparent text-xl font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">Why Choose Tracne?</h2>
            <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Camera className="h-12 w-12 text-teal-500" />}
                title="Easy Photo Logging"
                description="Quickly capture and log your skin's condition with our user-friendly interface."
              />
              <FeatureCard
                icon={<ChartLineUp className="h-12 w-12 text-blue-500" />}
                title="Progress Visualization"
                description="See your improvement over time with intuitive charts and graphs."
              />
              <FeatureCard
                icon={<Calendar className="h-12 w-12 text-indigo-500" />}
                title="Daily Tracker"
                description="Stay consistent with your skincare routine using daily entries."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gray-50 py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12">How Tracne Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-14">
              <StepCard
                number="1"
                title="Log Daily"
                description="Take a photo and note your skin condition each day."
              />
              <StepCard
                number="2"
                title="Track Progress"
                description="View charts and trends of your skin's improvement over time."
              />
              <StepCard
                number="3"
                title="Gain Insights"
                description="Understand what works best for your skin based on your data."
              />
            </div>
            <div className="mt-16">
              <Link to="/track">
                <button className="inline-flex items-center px-8 py-4 border border-teal-600 text-xl font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50 cursor-pointer">
                  Start Tracking
                  <ArrowRight className="ml-3 -mr-1 h-7 w-7" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-6 sm:mb-0">
            <h3 className="text-2xl font-semibold">Tracne</h3>
            <p className="text-lg text-teal-200">Your journey to clearer skin starts here</p>
          </div>
          <nav className="flex gap-6">
            <Link to="/about" className="text-lg hover:text-teal-300">About</Link>
            <Link to="/" className="text-lg hover:text-teal-300">Privacy</Link>
            <Link to="/" className="text-lg hover:text-teal-300">Terms</Link>
            <Link to="/" className="text-lg hover:text-teal-300">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100 mb-6">{icon}</div>
      <h3 className="text-2xl font-medium text-gray-900 mb-3">{title}</h3>
      <p className="text-lg text-gray-500">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-600 text-white text-2xl font-bold mb-6">
        {number}
      </div>
      <h3 className="text-2xl font-medium text-gray-900 mb-3">{title}</h3>
      <p className="text-lg text-gray-500">{description}</p>
    </div>
  );
}