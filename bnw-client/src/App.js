import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dttstt from "./pages/Dttstt";
import JimmyHasty from "./pages/JimmyHasty";
import TommyMcconville from "./pages/TommyMcconville";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dttstt/" element={<Dttstt />} />
          <Route path="jimmyhasty/" element={<JimmyHasty />} />
          <Route path="/tommymcconville" element={<TommyMcconville />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
