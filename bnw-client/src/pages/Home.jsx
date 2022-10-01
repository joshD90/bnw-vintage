import React from "react";
import styled from "styled-components";
import CrestInverted from "../components/CrestInverted";

const Container = styled.div`
  width: 100%;
  background-color: #b0b0b0;
`;

const MainHeader = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
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
    </Container>
  );
}

export default Home;
