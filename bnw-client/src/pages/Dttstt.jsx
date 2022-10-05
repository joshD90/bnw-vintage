import React from "react";
import styled from "styled-components";
import Product from "../components/Product";
import distillery from "../assets/dttstt/dttstt_distillery.jpg";
import ModelCarousel from "../components/ModelCarousel";
import { dttsttProductSpecs } from "../assets/dttstt/productSpecs";

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
  margin: 20px auto;
`;

const YoutubeContainer = styled.div`
  margin: 40px 40px;
  position: relative;
  padding-bottom: 56.25%;
`;

const YoutubeObject = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
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
      <DivideLine />
      <MottoDiv>
        <MottoContent>
          Drink The Town, Smoke The Town is about much more than cans of Harp
          and boxes of Carrolls, it's about how the natives of Dundalk live &
          breath The Town. We Drink it & Smoke it ⚫️⚪️
        </MottoContent>
      </MottoDiv>
      <DivideLine />

      <Product product={dttsttProductSpecs} />
      <DivideLine />
      <YoutubeContainer>
        <YoutubeObject
          src="https://www.youtube.com/embed/AhhOFsw8lgk?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0"
          width="100%"
          height="100%"
          frameborder="0"
          autoplay="0"
          watchLater="0"
          share="0"
          moreVideos="0"
          allowFullScreen
        ></YoutubeObject>
      </YoutubeContainer>
      <DivideLine />
      <ModelCarousel />
    </Container>
  );
}

export default Dttstt;
