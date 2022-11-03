import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/tommy_mcconville/tommy_mcconville_logo.jpg";
import tommyHandshake from "../assets/tommy_mcconville/tommy_mcconville.jpg";
import tommyProfile from "../assets/tommy_mcconville/tommy_mcconville_profile.jpg";
import tommyFullProfile from "../assets/tommy_mcconville/tommy_mcconville_full_profile.jpg";
import tommyCup from "../assets/tommy_mcconville/tommy_mcconville_cup.jpg";
import Product from "../components/Product";
import axios from "axios";
import { ipad, ipadAndMobile, mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
const BannerDiv = styled.div`
  background-color: #e1e1e1;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const Header = styled.h1`
  width: 100%;
  text-align: center;
  margin: 40px 0px 30px;
`;
const LogoDiv = styled.div`
  width: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  flex-shrink: 0;
`;
const LogoImg = styled.img`
  width: 70%;
  height: 70%;
`;

const LogoButtonDiv = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  align-self: flex-end;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    display: ${(props) => props.left && "none"};
    width: 100%;
  }
`;

const GoToButton = styled.button`
  border-style: none;
  height: 50px;
  width: 120px;
  color: white;
  background-color: black;
  cursor: pointer;
  &:hover {
    border: solid 2px black;
    background-color: white;
    color: black;
  }
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
  font-size: 1.3rem;
`;
const DivideLine = styled.hr`
  width: 60%;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  margin: 20px auto;
`;

const StoryDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin: 30px 40px;
  background-color: #e1e1e1;
  border-radius: 10px;
  overflow: hidden;
  ${ipadAndMobile({
    flexDirection: "column",
    margin: "5px 40px",
    width: "100%",
  })}
`;
const StoryTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1.2;
  flex-direction: column;
  ${ipadAndMobile({ width: "100%" })}
`;

const StoryText = styled.p`
  margin: 5px 40px;
  font-size: 1.1rem;
  line-height: 2rem;
  ${ipadAndMobile({ margin: "10px 5px" })}
`;
const StoryImgDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 50%;
  flex-shrink: 0;
  max-height: 100%;
  ${ipadAndMobile({ width: "100%" })}
`;
const StoryImg = styled.img`
  height: 70%;
  width: 90%;
  object-fit: cover;
  ${ipad({ width: "60%" })}
  ${mobile({ width: "75%" })}
`;

function TommyMcconville() {
  const [productSpecs, setProductSpecs] = useState(null);
  //make a request to backend for speicifc product document
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/634d7b4a11081d179ace02a3`)
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
  console.log("tommy mac product specs", productSpecs);
  return (
    <Container>
      <BannerDiv>
        <Header>Tommy McConville Collection</Header>
        <LogoButtonDiv left={true}>
          <a href="#storySection">
            <GoToButton>Read the Story</GoToButton>
          </a>
        </LogoButtonDiv>
        <LogoDiv>
          <LogoWrapper>
            <LogoImg src={logo}></LogoImg>
          </LogoWrapper>
        </LogoDiv>
        <LogoButtonDiv right={true}>
          <a href="#productSection">
            <GoToButton>Go To Product</GoToButton>
          </a>
        </LogoButtonDiv>
      </BannerDiv>
      <DivideLine />
      <MottoDiv>
        <MottoContent>Tommy McConville - Dundalk FC legend</MottoContent>
      </MottoDiv>
      <DivideLine />

      <StoryDiv id="storySection">
        <StoryTextDiv>
          <StoryText>
            Affectionately known as “Tommy Mac”, he is absolutely everything a
            local legend should be.
          </StoryText>
          <StoryText>
            819 appearances, 579 of these with Dundalk FC. 6 International caps.
            Three times Dundalk player of the year winner, The Soccer Writers
            Personality of the Year in 81/82, 4 league titles, 3 FAI cups, 2
            league cups, FAI cup hall of famer.
          </StoryText>
          <StoryText>
            Tommy played against Pele, Maradona, Kenny Daglish among other
            superstars. Tommy Mac was Dundalk’s superstar, the greatest player
            born in Dundalk, bar none.
          </StoryText>
        </StoryTextDiv>
        <StoryImgDiv>
          <StoryImg src={tommyProfile} />
        </StoryImgDiv>
      </StoryDiv>
      <StoryDiv>
        <StoryImgDiv>
          <StoryImg src={tommyHandshake} />
        </StoryImgDiv>
        <StoryTextDiv>
          <StoryText>
            Born on the 19th March 1946, Tommy and his brothers were all highly
            talented sportsmen. He made his first Dundalk appearance in 1964,
            however, it wasn’t until the 67/68 season that he really stamped his
            authority in a Dundalk shirt.
          </StoryText>
          <StoryText>
            Financial crisis meant that Dundalk had to shed themselves of some
            talent in 72/73. Tommy Mac joined up with Waterford, winning his
            first league of Ireland title in his very first season. Interest
            from Manchester United soon followed, Waterford rejected a bid, the
            move never materialised.
          </StoryText>
        </StoryTextDiv>
      </StoryDiv>
      <StoryDiv>
        <StoryTextDiv>
          <StoryText>
            The off-season saw Tommy play his ball in North America. Twice with
            Washington Diplomats, and one season with New York Apollos.
          </StoryText>
          <StoryText>
            The 75/76 season saw Tommy return home to Oriel Park, where the club
            dominated Irish football for the next 8 years under the guidance of
            Jim McLoughlin. 75/76 League winners. 76/77 FAI cup winners. 78/79
            League & FAI cup double winners, also reaching the last 16 of the
            European cup, losing narrowly to Celtic.
          </StoryText>
          <StoryText>
            The trend continued, silverware was never far from Tommy’s hands.
          </StoryText>
        </StoryTextDiv>
        <StoryImgDiv>
          <StoryImg src={tommyFullProfile} />
        </StoryImgDiv>
      </StoryDiv>
      <StoryDiv>
        <StoryTextDiv>
          <StoryText>
            Although his Dundalk career came to a close at the end of 85/86, he
            continued to play football at a high level with Newry Town until age
            42, and won a Dundalk Summer League medal aged 47. Amazingly, there
            was a gap of 28 years between his very first appearance for Dundalk,
            and his final game for Bank Rovers in 1993.
          </StoryText>
          <StoryText>
            Sadly Tommy passed away in 25 October 2013 aged 67.
          </StoryText>
          <StoryText>
            Tommy Mac lived and breathed football, and the people of Dundalk
            rightfully adored him. His legendary status not only in Dundalk, but
            across the whole country, will live forever.
          </StoryText>
        </StoryTextDiv>
        <StoryImgDiv>
          <StoryImg src={tommyCup} />
        </StoryImgDiv>
      </StoryDiv>
      <DivideLine id="productSection" />
      {productSpecs && <Product product={productSpecs} />}
    </Container>
  );
}

export default TommyMcconville;
