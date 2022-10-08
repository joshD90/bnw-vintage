import React from "react";
import styled from "styled-components";
import tommyShirt from "../assets/tommy_mcconville/tommy_mcconville_shirt.jpg";
import { Add, Remove } from "@mui/icons-material";

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  overflow: hidden;
  width: 100%;
  border: 1px solid lightgray;
`;
const ProductImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 150px;
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
  margin: 5px 0;
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

function CartProduct({ product }) {
  console.log(product);
  return (
    <ProductContainer>
      <ProductImage src={product.img} />
      <ProductDetailDiv>
        <ProductDetail>
          <b>Product: </b> {product.name}
        </ProductDetail>
        <ProductDetail>
          <b>ID: </b> 12345426667
        </ProductDetail>
        <ProductDetail>
          <b>Size: </b> {product.size}
        </ProductDetail>
        <ProductDetail>
          <b>Color: </b> <ColorBall color={product.color} />
        </ProductDetail>
      </ProductDetailDiv>
      <ProductAmountDiv>
        <ProductQuantDiv>
          <Remove style={{ cursor: "pointer" }} />
          <ProductQuantNum>{product.quantity}</ProductQuantNum>
          <Add style={{ cursor: "pointer" }} />
        </ProductQuantDiv>
        <ProductPrice>€ {product.price}</ProductPrice>
      </ProductAmountDiv>
    </ProductContainer>
  );
}

export default CartProduct;
