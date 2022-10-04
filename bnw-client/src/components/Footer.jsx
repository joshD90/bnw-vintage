import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import logoImg from "../assets/bnw-logo.webp";

const Container = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  color: #bdbbbb;
`;

const SocialDiv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  min-width: 100px;
`;
const SocialIcon = styled.div`
  padding: 3px;
  background: none;
  border: white solid 1px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    color: white;
  }
`;

const ContactDiv = styled.div`
  width: 50%;
  flex: 1;
`;
const ContactHeader = styled.div`
  text-align: center;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const ContactPathsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;
const ContactDetails = styled.div`
  cursor: pointer;
  margin: 5px;
  text-decoration: underline 0.15em black;
  transition: text-decoration 1s ease;
  text-underline-offset: 5px;
  &:hover {
    text-decoration-color: white;
    color: white;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const LogoText = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;
const LogoImg = styled.img`
  height: 100%;
  margin: 0 10px;
`;

function Footer() {
  return (
    <Container>
      <SocialDiv>
        <SocialIcon style={{ fontsize: "10px" }}>
          <Twitter />
        </SocialIcon>
        <SocialIcon>
          <Facebook />
        </SocialIcon>
        <SocialIcon>
          <Instagram />
        </SocialIcon>
      </SocialDiv>
      <LogoDiv>
        <LogoText>Black & White</LogoText>
        <LogoImg src={logoImg} />
        <LogoText>Vintage</LogoText>
      </LogoDiv>
      <ContactDiv>
        {/* <ContactHeader>Contact Us:</ContactHeader> */}
        <ContactPathsContainer>
          <ContactDetails>email: bnwvintage@gmail.com</ContactDetails>
          <ContactDetails>phone: 085 123 4567</ContactDetails>
        </ContactPathsContainer>
      </ContactDiv>
    </Container>
  );
}

export default Footer;
