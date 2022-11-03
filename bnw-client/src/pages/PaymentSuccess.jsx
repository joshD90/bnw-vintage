import React, { useEffect, useContext } from "react";
import { CartContext } from "../context/cartContext";
import BannerComponent from "../components/BannerComponent";

//this is the page you will be redirected to once stripe has successfully taken the payment
function PaymentSuccess() {
  //we cannot provide a receipt as it may take some time for the payment to be fully verified.
  //Stripe sends a receipt via email instead on full completion of transaction
  const thankText = "Thank You For Shopping With Us Today!";
  const subText = "Receipt Will Be Sent To Your Email";
  //acquire our cart context
  const { cart, setCart } = useContext(CartContext);
  //a blank cart
  const initialState = {
    products: [],
    cartQuantity: 0,
    total: 0,
  };
  //as payment is completed we can reset the cart and local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(initialState));
    setCart(initialState);
  }, []);

  return (
    <BannerComponent header={thankText} subHead={subText}></BannerComponent>
  );
}

export default PaymentSuccess;
