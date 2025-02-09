import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TopNavbar from "./components/navbar";
import Chatbot from "./components/Chatbot"; 
import Overview from "./pages/Overview";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import AboutTeam from "./pages/AboutTeam"; // Import AboutTeam page
import "bootstrap/dist/css/bootstrap.min.css";

function Layout({ fileUploaded, setFileUploaded }) {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";
  const showChatbot = location.pathname !== "/";

  return (
    <>
      {showNavbar && <TopNavbar />}
      {showChatbot && <Chatbot />}

      <div className="content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Overview />} />
              <Route path="/dashboard" element={<Dashboard fileUploaded={fileUploaded} />} />
              <Route path="/upload" element={<Upload setFileUploaded={setFileUploaded} />} />
              <Route path="/about-team" element={<AboutTeam />} /> {/* New Route for About the Team Page */}
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function App() {
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    <Router>
      <Layout fileUploaded={fileUploaded} setFileUploaded={setFileUploaded} />
    </Router>
  );
}

export default App;












