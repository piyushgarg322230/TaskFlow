import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


  return (
    <>
      <Routes>
        <Route path={`${directUrl.Home}`} element={<Home />} />
        <Route path={`${directUrl.login}`} element={<AuthSystem />} />
        <Route path={`${directUrl.taskFlow}`} element={<App />} />
        <Route path={`${directUrl.Profile}`} element={<Profile />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
