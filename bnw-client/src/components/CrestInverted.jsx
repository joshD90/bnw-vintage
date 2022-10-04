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

function CrestInverted() {
  const [topLeftText, setTopLeftText] = useState();
  const [bottomRightText, setBottomRightText] = useState();
  const [topRightPic, setTopRightPic] = useState();
  const [bottomLeftPic, setBottomLeftPic] = useState();
  const [topRightPicLeft, setTopRightPicLeft] = useState(0.5);
  const [bottomPicLeft, setBottomPicLeft] = useState(0.5);
  const [topPicTop, setTopPicTop] = useState(0);
  const [bottomPicTop, setBottomPicTop] = useState(0);
  let topPicLeftDirection = 1;
  let bottomPicLeftDirection = 1;
  let topPicTopDirection = 1;
  let bottomPicTopDirection = 1;

  function setText(setCorner) {
    const randomNumber = Math.floor(Math.random() * textSnippets.length);
    const randomText = textSnippets[randomNumber];
    setCorner(randomText);
  }

  function setPic(setCorner) {
    const randomNumber = Math.floor(Math.random() * imgSrcs.length);
    const randomPic = imgSrcs[randomNumber];
    setCorner(randomPic);
  }

  useEffect(() => {
    const timer = setInterval(() => setText(setTopLeftText), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setText(setBottomRightText), 1500);
  }, [topLeftText]);

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

  useEffect(() => {
    setTimeout(() => setPic(setBottomLeftPic), 1500);
    const opacityTimer = setInterval(() => {
      setBottomPicLeft((prev) => {
        if (prev <= -30) {
          bottomPicLeftDirection = 1;
        } else if (prev > 60) bottomPicLeftDirection = -1;
        return prev + bottomPicLeftDirection / 10;
      });
    }, 1);

    const topTimer = setInterval(() =>
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
