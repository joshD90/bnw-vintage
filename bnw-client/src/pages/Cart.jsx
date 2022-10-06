import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import styled from "styled-components";
import tommyShirt from "../assets/tommy_mcconville/tommy_mcconville_shirt.jpg";
import { Add, Remove } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
`;
const HeaderDiv = styled.div`
  margin: 20px;
`;
const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
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
`;
const SummaryDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px gray;
  border-radius: 5px;
`;
const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  overflow: hidden;
  width: 100%;
`;
const ProductImage = styled.img`
  height: 100%;
  object-fit: cover;
`;
const ProductDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 10px;
  height: 100%;
  flex: 3;
`;
const ProductDetail = styled.span`
  display: flex;
  align-items: center;
`;
const ColorBall = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-left: 5px;
`;
const ProductAmountDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1.5;
  border: 1px solid gray;
  height: 100%;
`;
const ProductQuantDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ProductQuantNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: solid 1px gray;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  margin: 0 5px;
`;
const ProductPrice = styled.span`
  margin: 20px;
  font-size: 1.5rem;
  color: gray;
`;

function Cart() {
  const cart = useContext(CartContext);
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
          <ProductContainer>
            <ProductImage src={tommyShirt} />
            <ProductDetailDiv>
              <ProductDetail>
                <b>Product: </b> Tommy McConville Shirt
              </ProductDetail>
              <ProductDetail>
                <b>ID: </b> 12345426667
              </ProductDetail>
              <ProductDetail>
                <b>Size: </b> S
              </ProductDetail>
              <ProductDetail>
                <b>Color: </b> <ColorBall color="black" />
              </ProductDetail>
            </ProductDetailDiv>
            <ProductAmountDiv>
              <ProductQuantDiv>
                <Remove style={{ cursor: "pointer" }} />
                <ProductQuantNum>2</ProductQuantNum>
                <Add style={{ cursor: "pointer" }} />
              </ProductQuantDiv>
              <ProductPrice>€ 20</ProductPrice>
            </ProductAmountDiv>
          </ProductContainer>
        </ProductDiv>
        <SummaryDiv>fdsafdsa</SummaryDiv>
      </BodyDiv>
    </Container>
  );
}

export default Cart;
