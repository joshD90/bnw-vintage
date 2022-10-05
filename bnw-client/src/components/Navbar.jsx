import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../assets/bnw-logo.webp";
import {
  Shop2Outlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import NotificationBadge from "./NotificationBadge";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LogoContainer = styled.div`
  width: 60px;
  height: 100%;
  padding: 0;
  margin: 0;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex: 1;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
  color: #bdbbbb;
  &:hover {
    color: white;
  }
`;

const CartDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-size: 1.5rem;
`;

function Navbar() {
  return (
    <Container>
      <LogoContainer>
        <LogoImg src={logoImg} />
      </LogoContainer>
      <ItemsContainer>
        <NavItem>Products</NavItem>
        <Link
          to="/dttstt"
          style={{ textDecoration: "none", width: "120px", flexShrink: "0" }}
        >
          <NavItem>Drink the Town, Smoke the Town</NavItem>
        </Link>
        <Link to="/jimmyhasty" style={{ textDecoration: "none" }}>
          <NavItem>Jimmy Hasty</NavItem>
        </Link>
        <Link to="/tommymcconville" style={{ textDecoration: "none" }}>
          <NavItem>Tommy McConville</NavItem>
        </Link>
        <NavItem>About</NavItem>
      </ItemsContainer>
      <CartDiv>
        <NotificationBadge
          materialUI={<ShoppingCartOutlined />}
          notificationNumber="0"
        ></NotificationBadge>
      </CartDiv>
    </Container>
  );
}

export default Navbar;
