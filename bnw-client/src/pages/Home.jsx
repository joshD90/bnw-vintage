import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CrestInverted from "../components/CrestInverted";
import HomeProduct from "../components/HomeProduct";
import IntersectionTest from "../components/IntersectionTest";

const Container = styled.div`
  width: 100%;
  background-color: #b0b0b0;
`;

const MainHeader = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px 0;
`;

const DivideLine = styled.hr`
  width: 60%;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  margin: 0 auto;
`;

function Home() {
  return (
    <Container>
      <MainHeader>Black and White Vintage</MainHeader>
      <DivideLine />
      <CrestInverted />
      <DivideLine />
      <HomeProduct />
      <HomeProduct textRight="row-reverse" />
      <HomeProduct />
      <HomeProduct textRight={true} />
      <HomeProduct />
      <HomeProduct textRight={true} />
    </Container>
  );
}

export default Home;
