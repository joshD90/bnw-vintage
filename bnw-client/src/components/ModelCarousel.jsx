import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import model1 from "../assets/dttstt/dttstt_model_dreds.jpg";
import model2 from "../assets/dttstt/dttstt_model_female_hoody.jpg";
import model3 from "../assets/dttstt/dttstt_model_glasses.jpg";
import model4 from "../assets/dttstt/dttstt_model_male_stairs.jpg";
import model5 from "../assets/dttstt/dttstt_model_sunglasses.jpg";
import model6 from "../assets/dttstt/dttstt_model_tshirt.jpg";
import model7 from "../assets/dttstt/dttstt_model_wall.jpg";
import { dttsttProductText as productTextArray } from "../assets/textSnippets";
import { CartContext } from "../context/cartContext";

const Container = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  margin: 50px 40px;
  border-radius: 5px;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const ProductText = styled.span`
  text-align: center;
  width: 50%;
  font-size: 1.2rem;
  color: ${(props) => props.textColor};
  transition: color ease 300ms;
`;

const CarouselDiv = styled.div`
  height: 100%;
  width: 400px;
  overflow: hidden;
  background-color: khaki;
  display: flex;
  flex-shrink: 0;
`;

const CarouselArrowDiv = styled.div`
  height: 100%;
  width: 40px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 2;
  left: ${(props) => props.direction === "left" && "0px"};
  right: ${(props) => props.direction === "right" && "0px"};
  color: white;
  display: ${(props) => (props.shouldDisplay ? undefined : "none")};
`;

const CarouselItemWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 400px;
  &:hover ${CarouselArrowDiv} {
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    );
  }
`;

const CarouselItemDiv = styled.div`
  height: 100%;
  position: absolute;
  background-color: lightgreen;
  display: flex;
  left: ${(props) => props.left}px;
  transition: all 2s ease;
`;

const CarouselItem = styled.img`
  width: 400px;
  height: 100%;
  object-fit: cover;
  background-color: red;
`;

function ModelCarousel() {
  const modelPics = [model1, model2, model3, model4, model5, model6, model7];
  const [carouselLeft, setCarouselLeft] = useState(0);
  const [leftText, setLeftText] = useState(productTextArray[0]);
  const [rightText, setRightText] = useState(productTextArray[1]);
  const [leftTextColor, setLeftTextColor] = useState("black");
  const [rightTextColor, setRightTextColor] = useState("black");
  const [textToChange, setTextToChange] = useState("left");

  const moveCarousel = (direction) => {
    if (direction === "left") {
      return setCarouselLeft((prev) => prev + 400);
    } else if (direction === "right")
      return setCarouselLeft((prev) => prev - 400);
  };

  const changeText = (side) => {
    const randomNumber = Math.floor(Math.random() * productTextArray.length);
    const randomText = productTextArray[randomNumber];
    if (randomText === leftText || randomText === rightText)
      return changeText(side);
    if (side === "left") {
      setTextToChange("right");
      setLeftText(randomText);
      setLeftTextColor("#f2f2f2");
      setTimeout(() => setLeftTextColor("black"), 500);
    }
    if (side === "right") {
      setTextToChange("left");
      setRightText(randomText);
      setRightTextColor("#f2f2f2");
      setTimeout(() => setRightTextColor("black"), 500);
    }
  };

  return (
    <Container>
      <TextContainer>
        <ProductText textColor={leftTextColor}>{leftText}</ProductText>
      </TextContainer>
      <CarouselDiv>
        <CarouselItemWrapper>
          <CarouselArrowDiv direction="left" display={carouselLeft !== 0}>
            <ArrowBackIosNew
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={() => {
                moveCarousel("left");
                changeText(textToChange);
              }}
            />
          </CarouselArrowDiv>
          <CarouselItemDiv left={carouselLeft}>
            {modelPics.map((pic, index) => {
              return <CarouselItem src={pic} key={index} />;
            })}
          </CarouselItemDiv>
          <CarouselArrowDiv
            direction="right"
            shouldDisplay={carouselLeft !== -400 * (modelPics.length - 1)}
          >
            <ArrowForwardIos
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={() => {
                moveCarousel("right");
                changeText(textToChange);
              }}
            />
          </CarouselArrowDiv>
        </CarouselItemWrapper>
      </CarouselDiv>
      <TextContainer>
        <ProductText textColor={rightTextColor}>{rightText}</ProductText>
      </TextContainer>
    </Container>
  );
}

export default ModelCarousel;
