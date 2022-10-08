import React from "react";
import ReactDOM from "react-dom/client";
import CartContextProvider from "./context/cartContext";
import AuthContextProvider from "./context/authContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
