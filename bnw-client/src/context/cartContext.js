import React, { useState } from "react";
//initialize our cart context
export const CartContext = React.createContext();
//if there is a cart already in local storage we load this up
const cartStorage = localStorage.getItem("cart");
let initialState;

//if not we set our cart to local storage to an empty initial state
if (!cartStorage) {
  initialState = {
    products: [],
    cartQuantity: 0,
    total: 0,
  };
  //or else we derive the cart storage from local storage
} else if (cartStorage) initialState = JSON.parse(cartStorage);

//we set up a cart context provider so we can pass down these value to the children
const CartContextProvider = (props) => {
  //we use setCart instead of use reducer to keep the state structure simple for this project
  const [cart, setCart] = useState(initialState);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
