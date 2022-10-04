import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dttstt from "./pages/Dttstt";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dttstt/" element={<Dttstt />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
