import React from "react";
import styled from "styled-components";
import jimmyLogo from "../assets/jimmy_hasty/jimmy_hasty_logo.jpg";
import jimmyProfile from "../assets/jimmy_hasty/jimmy_hasty_profile.jpg";
import jimmyCup from "../assets/jimmy_hasty/jimmy_hasty_cup.jpg";
import jimmyFamily from "../assets/jimmy_hasty/jimmy_hasty_family.jpg";
import Product from "../components/Product";
import { jimmyHastyProductSpecs as jimmyProduct } from "../assets/jimmy_hasty/productSpecs";
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
`;

const Header = styled.h1`
  width: 100%;
  text-align: center;
  margin: 40px 0px 30px;
`;
const LogoDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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
  height: 100%;
  margin-left: ${(props) => props.left && "10%"};
  margin-right: ${(props) => props.right && "10%"};
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
`;
const StoryTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1.2;
  flex-direction: column;
`;

const StoryText = styled.p`
  margin: 5px 40px;
  font-size: 1.1rem;
  line-height: 2rem;
`;
const StoryImgDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 50%;
  flex-shrink: 0;
`;
const StoryImg = styled.img`
  height: 70%;
  width: 90%;
  object-fit: cover;
`;

function JimmyHasty() {
  return (
    <Container>
      <BannerDiv>
        <Header>Jimmy Hasty Collection</Header>
        <LogoDiv>
          <LogoButtonDiv left={true}>
            <GoToButton>Go to Product</GoToButton>
          </LogoButtonDiv>
          <LogoWrapper>
            <LogoImg src={jimmyLogo}></LogoImg>
          </LogoWrapper>
          <LogoButtonDiv right={true}>
            <GoToButton>Read The Story</GoToButton>
          </LogoButtonDiv>
        </LogoDiv>
      </BannerDiv>
      <DivideLine />
      <MottoDiv>
        <MottoContent>Jimmy Hasty a Dundalk FC Legend</MottoContent>
      </MottoDiv>
      <DivideLine />

      <StoryDiv>
        <StoryTextDiv>
          <StoryText>
            Born in North Belfast in 1934, scorer of 103 goals over 6 seasons
            for Dundalk FC, 6ft 1 with an incredible first touch and a beast in
            the air. All whilst having only one arm.
          </StoryText>
          <StoryText>
            The story of Jimmy Hasty is as remarkable as it is tragic. Aged just
            14, on his first day at work, Jimmy was involved in a milling
            machine accident and had to have his left arm amputated.
          </StoryText>
          <StoryText>
            Undeterred, Jimmy scored goals everywhere he went, and it was at
            Newry Town where he was spotted by Dundalk board member Jim Malone.
            His signing was met with great scepticism, a goal & an assist on his
            debut cooled any worries. Jimmy was a bona-fide sharpshooter, and
            League Of Ireland grounds filled to catch a glimpse of “The one
            armed bandit”.
          </StoryText>
        </StoryTextDiv>
        <StoryImgDiv>
          <StoryImg src={jimmyProfile} />
        </StoryImgDiv>
      </StoryDiv>
      <StoryDiv>
        <StoryImgDiv>
          <StoryImg src={jimmyCup} />
        </StoryImgDiv>
        <StoryTextDiv>
          <StoryText>
            In 1962 Jimmy’s 19 goal haul guided Dundalk to their first league
            title in 30 years. The following year, against Zurich, Jimmy scored
            in what was the first away win for any Irish team in European
            football. Zurich progressed on aggregate, eventually losing to Real
            Madrid in the semi final.
          </StoryText>
          <StoryText>
            In 63/64 an injury free season saw Jimmy hit 35 goals, winning the
            League Of Ireland top goal scorer award. Throughout his 6 seasons he
            collected a league title & four domestic cups.
          </StoryText>
          <StoryText>
            Upon retirement, Jimmy moved back to Belfast and married his wife
            Margaret, and had two sons, Paul & Martin. He began work in a local
            bookmakers. On October 11th 1974 Jimmy was making his way to work
            when a car stopped. A gunman got out and opened fire, hitting Hasty
            in the back three times. He died aged 38. A sectarian “Tit-for-tat”
            murder claimed by the UVF. No one was ever charged.
          </StoryText>
        </StoryTextDiv>
      </StoryDiv>
      <StoryDiv>
        <StoryTextDiv>
          <StoryText>
            Although footage of Jimmy playing is hard to come by, former
            teammates & historians have always confirmed just how talented a
            player Jimmy was. Rather than letting his disability hinder him, he
            often utilised his stump to his advantage whilst challenging aerial
            balls.
          </StoryText>
          <StoryText>
            He will always be fondly remembered around Dundalk where his
            legendary status is undisputed.
          </StoryText>
          <StoryText>
            In Recognition for everything he stood for and to honour his
            enduring memory, Black and White Vintage Created this Legends Range
            and have presented it to his family
          </StoryText>
        </StoryTextDiv>
        <StoryImgDiv>
          <StoryImg src={jimmyFamily} />
        </StoryImgDiv>
      </StoryDiv>
      <DivideLine />
      <Product product={jimmyProduct} />
    </Container>
  );
}

export default JimmyHasty;
