import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route ,useNavigate } from 'react-router-dom';
import AuthSystem from "./AuthSystem";
import Home from "./Home";
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { directUrl } from "./Common"; // Adjust the import path as necessary
import App from "./App"; // Adjust the import path as necessary
import Profile from "./components/Profile"; // Adjust the import path as necessary
import './styles.css'; // Adjust the import path as necessary
export default function PortfolioPage() {
  

  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(null);
  
    useEffect(() => {
      const user = localStorage.getItem("users");
      const isAuthenticated = user && user !== "null" && user !== "undefined";
  
      if (!isAuthenticated) {
        navigate("/", { replace: true }); // or directUrl.Home
      } else {
        setIsAllowed(true);
      }
    }, [navigate]);
  
    // Optional: loading fallback
    if (isAllowed === null) return null;
  
    return isAllowed ? children : null;
  };

  return (
    <>
      <Routes>
        <Route path={directUrl.Home} element={<Home />} />
        <Route path={directUrl.login} element={<AuthSystem />} />
        <Route
          path={directUrl.taskFlow}
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path={directUrl.Profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
