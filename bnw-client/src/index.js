import React from "react";
import ReactDOM from "react-dom/client";
import CartContextProvider from "./context/cartContext";
import AuthContextProvider from "./context/authContext";
import PointerContextProvider from "./context/pointerContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
//we wrap our app in all the necessary contexts so that any component in the app will have access
//to them
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <PointerContextProvider>
          <App />
        </PointerContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
