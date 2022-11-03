import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { PointerContext } from "../context/pointerContext";
import styled from "styled-components";
import axios from "axios";
import CartProduct from "../components/CartProduct";
import ShippingAddress from "../components/ShippingAddress";
import { ipadAndMobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  min-height: 75vh;
  filter: ${(props) => props.isBlurred && "blur(4px)"};
  pointer-events: ${(props) => props.isDisabled && "none"};
`;
const HeaderDiv = styled.div`
  margin: 20px;
`;
const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  padding: 0;
  margin-top: 0;
`;
const HeaderButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderButton = styled.button`
  border: white 1px solid;
  padding: 10px;
  color: white;
  background-color: black;
  cursor: pointer;
  margin-bottom: 5px;
  &:hover {
    background-color: white;
    color: black;
    border: solid black 1px;
  }
  &:active {
    background-color: gray;
  }
`;

const BodyDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 20px;
  ${ipadAndMobile({ flexDirection: "column", alignItems: "center" })}
`;
const ProductDiv = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  margin-right: 2px;
`;
const SummaryDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px gray;
  border-radius: 5px;
  background-color: #e3e3e3;
  ${ipadAndMobile({ marginTop: "20px" })}
`;

const SummaryHead = styled.h1`
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
`;
const SummaryDetailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px 20px 5px;
  width: 100%;
`;
const SummaryDetailType = styled.span`
  margin-left: 5px;
`;
const SummaryDetailAmount = styled.span`
  margin-right: 5px;
`;

function Cart() {
  //grab our cart and mouse context
  const { cart } = useContext(CartContext);
  const { pointerState } = useContext(PointerContext);
  //set up our summary state which will give totals of product consts and quantities
  const [summary, setSummary] = useState({
    subTotal: 0,
    shipping: 5.0,
    discount: 0,
    total: 0,
  });
  //this holds the state that determines whether the shipping details entry form
  const [shippingVisible, setShippingVisible] = useState(false);
  //shipping details will hold the shipping object
  const [shippingDetails, setShippingDetails] = useState({});
  //for returning to shopping. pass -1 to navigate and this will return to most recent
  const navigate = useNavigate();
  //when the cart changes summaries will update
  useEffect(() => {
    //we map through all the products in the cart and create a shallow array of the prices and quantity
    const subTotalArray = cart.products.map((product) => {
      return product.price * product.quantity;
    });
    let sum = 0;
    //we now add all the elements together to get the total
    subTotalArray.forEach((e) => (sum += e));
    //use spread operator to preserve previous state while setting the subtotal
    setSummary((prev) => {
      return { ...prev, subTotal: sum };
    });
  }, [cart]);
  //if either the cart of the summary subtotal changes we change to altogether subtotal
  useEffect(() => {
    //add shipping and subtotal together and minus any discount
    const total = summary.subTotal + summary.shipping - summary.discount;
    setSummary((prev) => {
      return { ...prev, total: total };
    });
  }, [cart, summary.subTotal]);

  //carry out this function when shipping details go through
  const handlePay = async () => {
    try {
      //send the cart request to back end.
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/payment/`,
        { items: cart.products, shippingDetails: shippingDetails }
      );
      //the backend will create a url that will direct us to external stripe setting
      window.location.replace(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //when we go to payment we show a form to capture the shipping details
  const handleShipping = () => {
    setShippingVisible(true);
  };

  return (
    <>
      <Container isBlurred={shippingVisible} isDisabled={pointerState}>
        <HeaderDiv>
          <Header>Your Shopping Cart</Header>
          <HeaderButtonsDiv>
            <HeaderButton onClick={() => navigate(-1)}>
              Continue Shopping
            </HeaderButton>
            <HeaderButton onClick={handleShipping}>Go To Payment</HeaderButton>
          </HeaderButtonsDiv>
        </HeaderDiv>
        <BodyDiv>
          <ProductDiv>
            {cart.products.map((product, index) => (
              <CartProduct product={product} key={index} />
            ))}
          </ProductDiv>
          <SummaryDiv>
            <SummaryHead>Order Summary</SummaryHead>
            <SummaryDetailDiv>
              <SummaryDetailType>SubTotal:</SummaryDetailType>
              <SummaryDetailAmount>
                € {summary.subTotal.toFixed(2)}
              </SummaryDetailAmount>
            </SummaryDetailDiv>
            <SummaryDetailDiv>
              <SummaryDetailType>Shipping:</SummaryDetailType>
              <SummaryDetailAmount>
                € {summary.shipping.toFixed(2)}
              </SummaryDetailAmount>
            </SummaryDetailDiv>
            <SummaryDetailDiv>
              <SummaryDetailType>Discount:</SummaryDetailType>
              <SummaryDetailAmount>
                € {summary.discount.toFixed(2)}
              </SummaryDetailAmount>
            </SummaryDetailDiv>
            <SummaryDetailDiv>
              <SummaryDetailType>Total:</SummaryDetailType>
              <SummaryDetailAmount>
                € {summary.total.toFixed(2)}
              </SummaryDetailAmount>
            </SummaryDetailDiv>
            <HeaderButton onClick={handleShipping}>Pay Now</HeaderButton>
          </SummaryDiv>
        </BodyDiv>
      </Container>
      {shippingVisible && (
        <ShippingAddress
          func={handlePay}
          shipping={shippingDetails}
          setShipping={setShippingDetails}
          setShippingVisible={setShippingVisible}
        />
      )}
    </>
  );
}

export default Cart;
