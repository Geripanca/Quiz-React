import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import QuizApp from "./pages/quiz";
import Rules from "./pages/rules";

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
        <Routes>
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
