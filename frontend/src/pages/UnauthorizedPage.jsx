import { Link } from "react-router-dom"
import { ArrowRight, ShieldAlert } from "lucide-react"

export default function UnauthorizedAccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-b from-teal-50 to-blue-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>
        <ShieldAlert className="w-16 h-16 text-teal-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Unauthorized Access</h2>
        <p className="text-center text-gray-600 mb-8">
          Oops! It looks like you're trying to access tracne as a Guest. Sign in or create an account to start
          tracking your skin's progress.
        </p>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-center py-2 px-4 rounded"
          >
            Sign In
            
          </Link>
          
        </div>
      </div>
      <div className="mt-12 flex justify-center space-x-8">
        <div className="w-16 h-16 bg-teal-200 rounded-full opacity-50"></div>
        <div className="w-16 h-16 bg-blue-200 rounded-full opacity-50"></div>
        <div className="w-16 h-16 bg-teal-200 rounded-full opacity-50"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-teal-400"></div>
    </div>
  )
}

