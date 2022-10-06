import React, { useState } from "react";

export const CartContext = React.createContext();

const CartContextProvider = (props) => {
  const [cart, setCart] = useState({
    products: [],
    cartQuantity: 0,
    total: 0,
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
