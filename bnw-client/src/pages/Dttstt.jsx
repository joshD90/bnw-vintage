import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import distillery from "../assets/dttstt/dttstt_distillery.jpg";
import modelStairs from "../assets/dttstt/dttstt_model_male_stairs.jpg";

const Container = styled.div`
  width: 100%;
`;
const BannerDiv = styled.div`
  display: flex;
  background-image: url(${distillery});
  height: 70vh;
  background-repeat: none;
  background-size: cover;
  background-position-y: -100px;
  justify-content: space-between;
`;
const BannerLeft = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
`;
const BannerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const BannerText = styled.span`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  );
  color: white;
  margin: 50px;
  font-size: 4rem;
  border-radius: 5px;
  box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.7);
  padding: 10px;
`;

const MottoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const MottoContent = styled.span`
  width: 60%;
  margin: 20px 0;
`;
const DivideLine = styled.hr`
  width: 60%;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  margin: 0 auto;
`;

const ProductDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 500px;
  margin: 50px 40px;
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

function Dttstt() {
  return (
    <Container>
      <BannerDiv>
        <BannerLeft>
          <BannerText>Drink The Town</BannerText>
        </BannerLeft>
        <BannerRight>
          <BannerText>Smoke The Town</BannerText>
        </BannerRight>
      </BannerDiv>
      <MottoDiv>
        <MottoContent>
          Drink The Town, Smoke The Town is about much more than cans of Harp
          and boxes of Carrolls, it's about how the natives of Dundalk live &
          breath The Town. We Drink it & Smoke it ⚫️⚪️
        </MottoContent>
      </MottoDiv>
      <DivideLine />
      <ProductDiv>
        <ProductDescription>
          <ProductDescHead>
            Drink The Town, Smoke The Town Hoody
          </ProductDescHead>
          <ProductDescBody>
            For Our Second Drop this Hoody has been Carefully Crafted and is
            Well Fitted for a Comfortable Wear
          </ProductDescBody>
          <ProductDescPrice>€ 50</ProductDescPrice>
          <ProductAttr>
            <ProductColorDiv>
              <ProductColorLabel>Color Range: </ProductColorLabel>
              <ProductColor />
              <ProductColor />
            </ProductColorDiv>
            <ProductSizeDiv>
              <ProductSizeLabel>Size: </ProductSizeLabel>
              <ProductSelect>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
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
          <ProductImage src={modelStairs}></ProductImage>
        </ProductImageDiv>
      </ProductDiv>
    </Container>
  );
}

export default Dttstt;
