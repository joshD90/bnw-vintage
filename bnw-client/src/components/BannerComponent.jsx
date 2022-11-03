import React from "react";
import styled from "styled-components";
import logoImg from "../assets/bnw-logo.webp";
import { mobile, computer, ipad, ipadAndMobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: #f1f1f1;
  margin-bottom: 30px;
`;

const BannerTitle = styled.span`
  width: 100%;
  font-size: 3rem;
  margin: 10px;
`;
const SubHead = styled.span`
  width: 100%;
  font-size: 1.2rem;
  margin-top: 10px;
`;
const ButtonDiv = styled.div`
  max-width: 33%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  ${ipadAndMobile({ display: "none" })}
`;
const Button = styled.div`
  width: 100px;
  height: 50px;
  border: 1px solid transparent;
  background-color: black;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;
const CrestDiv = styled.div`
  height: 80%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;
const CrestWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  overflow: hidden;
`;

const CrestImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
//this is used for the banner of the HomePage
function BannerComponent({ header, subHead }) {
  return (
    <Container>
      <BannerTitle>{!header ? "Black & White Vintage" : header}</BannerTitle>
      {subHead && <SubHead>{subHead}</SubHead>}
      {/* <ButtonDiv>
        <Button>Click Me</Button>
      </ButtonDiv> */}
      <CrestDiv>
        <CrestWrapper>
          <CrestImg src={logoImg} />
        </CrestWrapper>
      </CrestDiv>
      {/* <ButtonDiv>
        <Button>Click me too </Button>
      </ButtonDiv> */}
    </Container>
  );
}

export default BannerComponent;
