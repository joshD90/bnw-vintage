import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
