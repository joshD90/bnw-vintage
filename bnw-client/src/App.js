import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dttstt from "./pages/Dttstt";
import JimmyHasty from "./pages/JimmyHasty";
import TommyMcconville from "./pages/TommyMcconville";
import Cart from "./pages/Cart";
import Upload from "./pages/admin/UploadPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductEdit from "./pages/admin/AdminProductEdit";
import SingleProduct from "./pages/SingleProduct";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import About from "./pages/About";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import AdminOrders from "./pages/admin/AdminOrders";

//this holds all our routes and uses react router dom to navigate
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* all routes contained in this are nested in the admin section and are protected */}
        <Route path="/admin/" element={<ProtectedAdminRoute />}>
          <Route path="/admin/products/create" element={<Upload />} />
          <Route path="/admin/products/" element={<AdminProducts />} />
          <Route
            path="/admin/products/:productId/edit"
            element={<AdminProductEdit />}
          />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
        {/* all user accessible routes are nested within this route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dttstt/" element={<Dttstt />} />
          <Route path="jimmyhasty/" element={<JimmyHasty />} />
          <Route path="tommymcconville" element={<TommyMcconville />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="about" element={<About />} />
          <Route path="payment/success" element={<PaymentSuccess />} />
          <Route path="payment/cancel/:bookingId" element={<PaymentCancel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
