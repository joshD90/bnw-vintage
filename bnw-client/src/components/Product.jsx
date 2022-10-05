import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

import modelStairs from "../assets/dttstt/dttstt_model_male_stairs.jpg";

const ProductDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 500px;
  margin: 50px 40px;
  background-color: #f2f2f2;
  border-radius: 5px;
  overflow: hidden;
`;
const ProductDescription = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const ProductDescHead = styled.h1`
  margin: 15px 15px;
`;
const ProductDescBody = styled.span`
  margin: 20px 15px;
`;
const ProductDescPrice = styled.span`
  font-size: 3rem;
  font-weight: 300;
  margin: 30px 15px;
`;

const ProductAttr = styled.div`
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductColorDiv = styled.div`
  display: flex;
  align-items: center;
`;
const ProductColorLabel = styled.div`
  margin-right: 10px;
`;
const ProductColor = styled.div`
  background-color: black;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

const ProductSizeDiv = styled.div`
  margin-right: 20px;
`;

const ProductSizeLabel = styled.span`
  font-size: 1rem;
  margin-right: 10px;
`;
const ProductSelect = styled.select`
  border-style: solid black 1px;
`;

const ProductImageDiv = styled.div`
  width: 50%;
  height: 100%;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PurchaseDiv = styled.div`
  margin: 30px 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const QuantityDiv = styled.div`
  display: flex;
`;
const Quantity = styled.div`
  border-radius: 5px;
  border: solid black 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  margin: 0 5px;
`;
const PurchaseButton = styled.button`
  border-style: none;
  height: 50px;
  color: white;
  background-color: black;
  cursor: pointer;
  &:hover {
    border: solid 2px black;
    background-color: white;
    color: black;
  }
`;

function Product({ product }) {
  return (
    <ProductDiv>
      <ProductDescription>
        <ProductDescHead>{product.head}</ProductDescHead>
        <ProductDescBody>{product.body}</ProductDescBody>
        <ProductDescPrice>€ {product.price}</ProductDescPrice>
        <ProductAttr>
          <ProductColorDiv>
            <ProductColorLabel>Color Range: </ProductColorLabel>
            <ProductColor />
            <ProductColor />
          </ProductColorDiv>
          <ProductSizeDiv>
            <ProductSizeLabel>Size: </ProductSizeLabel>
            <ProductSelect>
              {product.sizes.map((size) => (
                <option>{size}</option>
              ))}
            </ProductSelect>
          </ProductSizeDiv>
        </ProductAttr>
        <PurchaseDiv>
          <QuantityDiv>
            <Remove style={{ cursor: "pointer" }} />
            <Quantity>1</Quantity>
            <Add style={{ cursor: "pointer" }} />
          </QuantityDiv>
          <PurchaseButton>Add To Cart</PurchaseButton>
        </PurchaseDiv>
      </ProductDescription>
      <ProductImageDiv>
        <ProductImage src={product.img}></ProductImage>
      </ProductImageDiv>
    </ProductDiv>
  );
}

export default Product;
