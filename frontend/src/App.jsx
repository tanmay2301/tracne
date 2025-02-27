import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import TrackPage from "./pages/TrackPage";
import AcneAnalysisPage from "./pages/AcneAnalysisPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";  // Import ProtectedRoute
import UnauthorizedPage from "./pages/UnauthorizedPage"
import AboutPage from "./pages/AboutPage"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<UnauthorizedPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/track" element={<TrackPage />} />
            <Route path="/analysis" element={<AcneAnalysisPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;