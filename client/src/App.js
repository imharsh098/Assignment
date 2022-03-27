import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./components/Account";
import HomePage from "./components/HomePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Account />}></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
