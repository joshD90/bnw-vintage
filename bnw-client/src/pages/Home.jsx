import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CrestInverted from "../components/CrestInverted";
import HomeProduct from "../components/HomeProduct";
import IntersectionTest from "../components/IntersectionTest";
import axios from "axios";
import BannerComponent from "../components/BannerComponent";
import { mobile, computer, ipad, ipadAndMobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  background-color: #d2d2d2;
  padding-bottom: 20px;
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
  const [products, setProducts] = useState(null);
  //this makes a request to the backend for the list of products
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/home`)
      .then((res) => {
        //this returns a limited list of most recent products
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <BannerComponent />
      <DivideLine />
      {products &&
        products.map((elem, index) => {
          //every second product will have its sides reversed
          let textRight;
          index % 2 === 0 ? (textRight = true) : (textRight = false);
          return <HomeProduct src={elem} textRight={textRight} key={index} />;
        })}
    </Container>
  );
}

export default Home;
