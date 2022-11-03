import React, { useEffect, useState } from "react";
import styled from "styled-components";
import crestInverted from "../assets/crest-inverted.webp";
import textSnippets from "../assets/textSnippets";
import imgSrcs from "../assets/imgSrc";

const Container = styled.div`
  background-color: #b0b0b0;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CrestDiv = styled.div`
  width: 600px;
  height: 85%;
  position: relative;
`;
const BackImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 50%;
  width: 50%;
  overflow: hidden;
`;
const BackImage = styled.img.attrs((props) => ({
  style: { left: props.left + "px", top: props.top + "px" },
}))`
  position: absolute;
  height: 120%;
  width: 120%;
  object-fit: cover;
`;
const BackImageText = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: ${(props) =>
    props.position === "topLeft" ? "flex-end" : "flex-start"};
  align-items: ${(props) =>
    props.position === "topLeft" ? "flex-end " : "flex-start"};
  background-color: black;
  color: white;
`;
const InnerTextDiv = styled.div`
  text-align: center;
  color: white;
  width: 40%;
  height: 70%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 20px;
`;
const CrestImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
//this is used within the about page
function CrestInverted() {
  const [topLeftText, setTopLeftText] = useState(textSnippets[0]);
  const [bottomRightText, setBottomRightText] = useState(textSnippets[1]);
  const [topRightPic, setTopRightPic] = useState(imgSrcs[0]);
  const [bottomLeftPic, setBottomLeftPic] = useState(imgSrcs[1]);
  const [topRightPicLeft, setTopRightPicLeft] = useState(0.5);
  const [bottomPicLeft, setBottomPicLeft] = useState(0.5);
  const [topPicTop, setTopPicTop] = useState(0);
  const [bottomPicTop, setBottomPicTop] = useState(0);
  let topPicLeftDirection = 1;
  let bottomPicLeftDirection = 1;
  let topPicTopDirection = 1;
  let bottomPicTopDirection = 1;
  //the top left and bottom right contain text which will display a randomised text
  function setText(setCorner) {
    const randomNumber = Math.floor(Math.random() * textSnippets.length);
    const randomText = textSnippets[randomNumber];
    setCorner(randomText);
  }
  //the top right and bottom left corner hold a randomised picture
  function setPic(setCorner) {
    //set up a random number
    const randomNumber = Math.floor(Math.random() * imgSrcs.length);
    const randomPic = imgSrcs[randomNumber];
    //assign this picture src to these corners
    setCorner(randomPic);
  }
  //each of these randomised picture and text setting are based on different timers
  useEffect(() => {
    const timer = setInterval(() => setText(setTopLeftText), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setText(setBottomRightText), 1500);
  }, [topLeftText]);
  //set images based on timers.  This picture will move around gradually due to the crest being
  //to small to display the full picture
  useEffect(() => {
    const timer = setInterval(() => setPic(setTopRightPic), 4000);
    const leftTimer = setInterval(
      () =>
        setTopRightPicLeft((prev) => {
          if (prev <= -100) {
            topPicLeftDirection = 1;
          } else if (prev > 0) topPicLeftDirection = -1;
          return prev + topPicLeftDirection / 10;
        }),
      1
    );
    const topTimer = setInterval(() =>
      setTopPicTop((prev) => {
        if (prev <= -30) {
          topPicTopDirection = 1;
        } else if (prev > 40) topPicTopDirection = -1;
        return prev + topPicTopDirection / 10;
      })
    );
    return () => {
      clearInterval(timer);
      clearInterval(leftTimer);
      clearInterval(topTimer);
    };
  }, []);
  //this is the bottom picture that changes depending on the previous picture being set. works off the other picture
  //changing as a dependency
  useEffect(() => {
    setTimeout(() => setPic(setBottomLeftPic), 1500);
    //moves the picture around within specified boundaries
    const opacityTimer = setInterval(() => {
      //change left css
      setBottomPicLeft((prev) => {
        if (prev <= -30) {
          bottomPicLeftDirection = 1;
        } else if (prev > 60) bottomPicLeftDirection = -1;
        return prev + bottomPicLeftDirection / 10;
      });
    }, 1);

    const topTimer = setInterval(() =>
      //change top css
      setBottomPicTop((prev) => {
        if (prev <= -70) {
          bottomPicTopDirection = 1;
        } else if (prev > 0) bottomPicTopDirection = -1;
        return prev + bottomPicTopDirection / 10;
      })
    );

    return () => {
      clearInterval(opacityTimer);
      clearInterval(topTimer);
    };
  }, [topRightPic]);

  return (
    <Container>
      <CrestDiv>
        <BackImageContainer>
          <BackImageText position="topLeft">
            <InnerTextDiv>{topLeftText}</InnerTextDiv>
          </BackImageText>
          <ImageWrapper>
            <BackImage
              src={topRightPic}
              left={topRightPicLeft}
              top={topPicTop}
            />
          </ImageWrapper>
          <ImageWrapper>
            <BackImage
              src={bottomLeftPic}
              left={bottomPicLeft}
              top={bottomPicTop}
            />
          </ImageWrapper>

          <BackImageText position="bottomRight">
            <InnerTextDiv>{bottomRightText}</InnerTextDiv>
          </BackImageText>
        </BackImageContainer>
        <CrestImage src={crestInverted} />
      </CrestDiv>
    </Container>
  );
}

export default CrestInverted;
