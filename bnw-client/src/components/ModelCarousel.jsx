import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import React, { useState } from "react";
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
import { ipad, mobile, ipadAndMobile } from "../responsive";

const Container = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  margin: 50px 40px;
  border-radius: 5px;
  ${ipad({ margin: "50px 10px" })};
  ${mobile({ margin: "50px 0" })};
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  ${ipadAndMobile({ display: "none" })};
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
  background-color: blue;
  width: ${({ picWidth }) => picWidth}px;
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
  width: ${(props) => props.picWidth}px;
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
  left: ${(props) => props.left * props.picWidth}px;
  transition: all 2s ease;
`;

const CarouselItem = styled.img`
  width: ${(props) => props.picWidth}px;
  height: 100%;
  object-fit: cover;
`;
//this carousel stands at the bottom of the dttstt, jimmy hasty and tommy mc page.
//pic width is set to 400px or the width of the inner window
function ModelCarousel({ picWidth }) {
  const modelPics = [model1, model2, model3, model4, model5, model6, model7];
  const [carouselLeft, setCarouselLeft] = useState(0);
  const [leftText, setLeftText] = useState(productTextArray[0]);
  const [rightText, setRightText] = useState(productTextArray[1]);
  const [leftTextColor, setLeftTextColor] = useState("black");
  const [rightTextColor, setRightTextColor] = useState("black");
  const [textToChange, setTextToChange] = useState("left");

  //if the direction is left we increase or decrease the index of the image array depending
  //on the direction
  const moveCarousel = (direction) => {
    if (direction === "left") {
      return setCarouselLeft((prev) => prev + 1);
    } else if (direction === "right")
      return setCarouselLeft((prev) => prev - 1);
  };
  //on either side of the carousel random text from an array of snippets will be displayed.  This
  //is linked to the click of a direction.  The text will intermittently change from one to the other
  const changeText = (side) => {
    //select our random number
    const randomNumber = Math.floor(Math.random() * productTextArray.length);
    //assign the random text and change the text to change to the other side
    const randomText = productTextArray[randomNumber];
    //if the two texts are the same then we restart the process
    if (randomText === leftText || randomText === rightText)
      return changeText(side);
    if (side === "left") {
      //this section animates the text through props fading in and out
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
      <CarouselDiv picWidth={picWidth}>
        <CarouselItemWrapper picWidth={picWidth}>
          <CarouselArrowDiv direction="left" shouldDisplay={carouselLeft !== 0}>
            <ArrowBackIosNew
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={() => {
                moveCarousel("left");
                changeText(textToChange);
              }}
            />
          </CarouselArrowDiv>
          <CarouselItemDiv left={carouselLeft} picWidth={picWidth}>
            {modelPics.map((pic, index) => {
              return <CarouselItem src={pic} key={index} picWidth={picWidth} />;
            })}
          </CarouselItemDiv>
          <CarouselArrowDiv
            direction="right"
            shouldDisplay={carouselLeft !== -1 * (modelPics.length - 1)}
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
