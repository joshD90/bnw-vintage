import React, { useEffect, useState } from "react";
import styled from "styled-components";
import crestInverted from "../assets/crest-inverted.webp";
import textSnippets from "../assets/textSnippets";

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
const BackImage = styled.img`
  width: 50%;
  height: 50%;
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

  function setText(setCorner) {
    const randomNumber = Math.floor(Math.random() * textSnippets.length);
    console.log(randomNumber);
    const randomText = textSnippets[randomNumber];
    console.log(randomText);
    setCorner(randomText);
  }

  useEffect(() => {
    const timer = setInterval(() => setText(setTopLeftText), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setText(setBottomRightText), 1500);
  }, [topLeftText]);

  return (
    <Container>
      <CrestDiv>
        <BackImageContainer>
          <BackImageText position="topLeft">
            <InnerTextDiv>{topLeftText}</InnerTextDiv>
          </BackImageText>
          <BackImage src="https://assets.bigcartel.com/assets/14133/Hasty+header.jpg?w=2400&h=2400" />
          <BackImage src="https://assets.bigcartel.com/assets/14133/Hasty+header.jpg?w=2400&h=2400" />
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
