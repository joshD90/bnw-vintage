import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Product from "../components/Product";
import distillery from "../assets/dttstt/dttstt_distillery.jpg";
import ModelCarousel from "../components/ModelCarousel";
import axios from "axios";
import { ipadAndMobile, ipad, mobile } from "../responsive";

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
  @media (max-width: 1250px) {
    background-position-y: 0;
  }
  ${ipadAndMobile({ flexDirection: "column" })}
`;
const BannerLeft = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  ${ipadAndMobile({ width: "100%" })}
`;
const BannerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  ${ipadAndMobile({ width: "100%", alignItems: "flex-end" })}
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

  ${ipad({ fontSize: "3rem", margin: "15px 10px" })}
  ${mobile({ fontSize: "2.5rem", margin: "5px 10px" })}
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
  ${ipad({ margin: "40px 10px" })}
  ${mobile({ margin: "40px 0" })}
`;

const YoutubeObject = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
`;

function Dttstt() {
  //set up our states
  const [productSpecs, setProductSpecs] = useState(null);
  //we want to set up the carousel width resposive to the size of the screen if below 400px
  //if the screen width is larger than set at default 400px
  const [carouselWidth, setCarouselWidth] = useState(
    window.innerWidth < 400 ? window.innerWidth : 400
  );
  //this function is triggered on the event listener of window resize and sets our carousel size
  //We employ useCallback to avoid unnecessary renders
  const handleWindowResize = useCallback((e) => {
    if (window.innerWidth < 400) return setCarouselWidth(window.innerWidth);
    setCarouselWidth(400);
  });
  //add an event listener for the change in screen size
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    //return removeEventListener to avoid compounding the number of listeners added
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);
  //on page load we make a request to backend
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/634db23511081d179ace02e5`)
      .then((res) => {
        //the product component was initially set up in such a way that does not match the model and so we
        //adjust the data which we will pass through to product
        const adjustedData = {
          head: res.data.name,
          body: res.data.desc,
          price: res.data.basePrice,
          sizes: res.data.sizes,
          img: res.data.image,
          productId: res.data._id,
          productAttr: res.data.attributes,
        };
        setProductSpecs(adjustedData);
      })
      .catch((error) => console.log(error));
  }, []);

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

      {productSpecs && <Product product={productSpecs} />}
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
      <ModelCarousel picWidth={carouselWidth} />
    </Container>
  );
}

export default Dttstt;
