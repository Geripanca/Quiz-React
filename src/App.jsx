import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import QuizApp from "./pages/quiz";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Routes>
          <Route path="/quizapp" element={<QuizApp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
