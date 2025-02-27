import { CheckCircle, BarChart2, Lock, Camera, Brain } from "lucide-react"
import { Link } from "react-router-dom";

const LearnMorePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
    

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">About Tracne</h2>

        <section className="mb-12">
          <p className="text-lg text-gray-700 mb-4">
            Acne is more than just a skin concern—it affects confidence, mental well-being, and daily life. But figuring
            out what triggers breakouts and what helps clear them up can feel like a guessing game. Having experienced
            acne first hand for several years, I know the pain and experience of trying multiple skincare products,
            diets, and routines without knowing what actually works for their skin.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            That's why I built Tracne—a simple yet powerful way to track your acne journey. By logging your daily
            habits, skincare routine, and breakouts, you can spot patterns over time, identify triggers, and make
            informed decisions about your skincare.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
          <p className="text-lg text-gray-700 mb-6">Tracne makes acne tracking effortless:</p>
          <ul className="space-y-4">
            {[
              {
                icon: <CheckCircle className="h-6 w-6 text-teal-500" />,
                text: "Daily Logs – Record your skincare routine, food intake, acne type, and number of breakouts each day. Each log is stored as a card for easy access.",
              },
              {
                icon: <BarChart2 className="h-6 w-6 text-teal-500" />,
                text: "Progress Insights – Your tracked data is used to generate graphs and charts, helping you understand trends and patterns in your skin health.",
              },
              {
                icon: <Lock className="h-6 w-6 text-teal-500" />,
                text: "Secure & Private – All your logs are stored securely and are accessible only to you.",
              },
              {
                icon: <Camera className="h-6 w-6 text-teal-500" />,
                text: "Image Uploads – Add photos to your logs to visually track changes in your skin.",
              },
              {
                icon: <Brain className="h-6 w-6 text-teal-500" />,
                text: "Future Scope – I plan to integrate AI-driven acne prediction to help you get even deeper insights into your skin.",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 mt-1">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <p className="text-lg text-gray-700 mb-4">
            Tracne is your personal acne diary, designed to help you take control of your skincare
            journey. <br />Happy Tracking!
          </p>
        </section>

        <Link to = "/track">
        <div className="mt-10 flex justify-center">
          <button className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
            Start Tracking Today
        
          </button>
        </div>
        </Link>    
        
      </main>

      <footer className="bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
          <p>&copy; 2025 Tracne. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LearnMorePage

