import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token"); // Check if user has a token
    console.log("🔍 ProtectedRoute Check - Token:", token);
    
    if (!token) {
        console.log("🚫 No token found! Redirecting to /signin");
        return <Navigate to="/signin" replace />;
    }
    
    console.log("✅ Token found! Rendering protected content");
    return <Outlet />;
};

export default ProtectedRoute;