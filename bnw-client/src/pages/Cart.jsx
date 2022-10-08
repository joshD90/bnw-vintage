import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import styled from "styled-components";
import tommyShirt from "../assets/tommy_mcconville/tommy_mcconville_shirt.jpg";

import CartProduct from "../components/CartProduct";

const Container = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  min-height: 75vh;
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
  &:hover {
    background-color: white;
    color: black;
    border: solid black 1px;
  }
`;

const BodyDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 20px;
`;
const ProductDiv = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px gray;
  border-radius: 5px;
  margin-right: 2px;
  background-color: #e3e3e3;
`;
const SummaryDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px gray;
  border-radius: 5px;
  background-color: #e3e3e3;
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
  margin: 5px 10px;
  width: 100%;
`;
const SummaryDetailType = styled.span`
  margin-left: 5px;
`;
const SummaryDetailAmount = styled.span`
  margin-right: 5px;
  margin-bottom: 20px;
`;

function Cart() {
  const { cart } = useContext(CartContext);
  console.log(cart, "cart from cart component");
  return (
    <Container>
      <HeaderDiv>
        <Header>Your Shopping Cart</Header>
        <HeaderButtonsDiv>
          <HeaderButton>Continue Shopping</HeaderButton>
          <HeaderButton>Go To Shopping</HeaderButton>
        </HeaderButtonsDiv>
      </HeaderDiv>
      <BodyDiv>
        <ProductDiv>
          {cart.products.map((product) => (
            <CartProduct product={product} />
          ))}
        </ProductDiv>
        <SummaryDiv>
          <SummaryHead>Order Summary</SummaryHead>
          <SummaryDetailDiv>
            <SummaryDetailType>SubTotal:</SummaryDetailType>
            <SummaryDetailAmount>€ 120.00</SummaryDetailAmount>
          </SummaryDetailDiv>
          <SummaryDetailDiv>
            <SummaryDetailType>Shipping:</SummaryDetailType>
            <SummaryDetailAmount>€ 5.00</SummaryDetailAmount>
          </SummaryDetailDiv>
          <SummaryDetailDiv>
            <SummaryDetailType>Discount:</SummaryDetailType>
            <SummaryDetailAmount>€ -10.00</SummaryDetailAmount>
          </SummaryDetailDiv>
          <SummaryDetailDiv>
            <SummaryDetailType>Total:</SummaryDetailType>
            <SummaryDetailAmount>€ 115.00</SummaryDetailAmount>
          </SummaryDetailDiv>
        </SummaryDiv>
      </BodyDiv>
    </Container>
  );
}

export default Cart;
