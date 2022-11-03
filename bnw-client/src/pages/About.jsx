import React from "react";
import styled from "styled-components";
import BannerComponent from "../components/BannerComponent";
import { ipadAndMobile } from "../responsive";

const Container = styled.div`
  min-height: 70vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  background-color: #f1f1f1;
`;

const TriangleDiv = styled.div`
  position: relative;
  height: 200vh;
  width: 100%;
  overflow: hidden;
`;

const LeftTriangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 130px 0 10px 100vw;
  border-color: transparent transparent transparent #b1b1b1;
  position: absolute;
  top: ${(props) => props.top};
`;
const RightTriangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 60px 100vw 100px 0;
  border-color: transparent black transparent transparent;
  position: absolute;
  top: ${(props) => props.top};
`;
const UpTriangle = styled.div`
  position: absolute;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 130px 600px 0px;
  border-color: transparent transparent black transparent;
  transform: rotate(354deg);
  bottom: -10px;
  left: 32px;
`;

const WhereWhenDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 90%;
  margin-bottom: 200px;
`;
const WhereWhenHead = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 15px;
  margin-bottom: 20px;
`;

const WhyDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 30px;
  height: 200px;
  margin-bottom: 300px;
`;
const WhyHead = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ValueDiv = styled.div`
  width: 100vw;
  height: 500px;
  position: relative;
`;
const ValueHead = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  margin-left: 10vw;
`;
const ValueSphere = styled.div`
  border-radius: 50%;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.radius};
  height: ${(props) => props.radius};
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  border: 5px solid gray;
  text-align: center;
  font-weight: 600;
  ${ipadAndMobile({ width: "100px", height: "100px" })}
`;
function About() {
  return (
    <Container>
      <BannerComponent style={{ width: "100vw" }} header="About Us" />
      <TriangleDiv>
        <LeftTriangle top="50px" />
        <RightTriangle top="125px" />
        <RightTriangle top="570px" />
        <LeftTriangle top="600px" />
        <UpTriangle
          style={{
            borderColor: "transparent transparent gray transparent",
            left: 70,
            transform: "rotate(350deg)",
            bottom: "-40px",
          }}
        />
        <UpTriangle />
        <WhereWhenDiv>
          <WhereWhenHead>Where and When?</WhereWhenHead>
          <span>We were born in Dundalk December 2020</span>
        </WhereWhenDiv>
        <WhyDiv>
          <WhyHead>Why Do We Do What We Do?</WhyHead>
          <p>
            I’ve long held an affection towards all things football, espcially
            vintage football kits and training gear, along with a deep rooted
            love for my local team, Dundalk FC.
          </p>
          <p>
            I also have a keen interest in mens vintage clothing, so combining
            both had been a dream for a long time.
          </p>
        </WhyDiv>
        <ValueDiv>
          <ValueHead>What We Hold Imporant</ValueHead>
          <ValueSphere radius="13vw" left="10vw" top="50px">
            Pints of Harp
          </ValueSphere>
          <ValueSphere radius="15vw" left="63vw" top="80px">
            Dundalk FC
          </ValueSphere>
          <ValueSphere radius="12vw" left="30vw" top="140px">
            Local businesses
          </ValueSphere>
          <ValueSphere radius="13vw" left="63vw" top="370px">
            Local charities
          </ValueSphere>
          <ValueSphere radius="14vw" left="35vw" style={{ bottom: "0px" }}>
            Pride in Dundalk
          </ValueSphere>
        </ValueDiv>
      </TriangleDiv>
    </Container>
  );
}

export default About;
