import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dttstt from "./pages/Dttstt";
import JimmyHasty from "./pages/JimmyHasty";
import TommyMcconville from "./pages/TommyMcconville";
import Cart from "./pages/Cart";
import Upload from "./pages/admin/UploadPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/AdminProducts";

function App() {
  const { user } = useContext(AuthContext);
  let userUid = user && user.uid;
  console.log(userUid, "uid");
  console.log(process.env.REACT_APP_ADMIN_UID);

  return (
    <Router>
      <Routes>
        <Route path="/admin/" element={<AdminLogin />} />
        <Route
          path="/admin/products/create"
          element={
            userUid == process.env.REACT_APP_ADMIN_UID ? (
              <Upload />
            ) : (
              <Navigate to="/admin/" replace />
            )
          }
        />
        <Route path="/admin/products/" element={<AdminProducts />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dttstt/" element={<Dttstt />} />
          <Route path="jimmyhasty/" element={<JimmyHasty />} />
          <Route path="tommymcconville" element={<TommyMcconville />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
