import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../assets/bnw-logo.webp";
import {
  Shop2Outlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import NotificationBadge from "./NotificationBadge";
import { CartContext } from "../context/cartContext";
import { PointerContext } from "../context/pointerContext";
import { mobile, computer, ipad, ipadAndMobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  pointer-events: ${(props) => props.isDisabled && "none"};
  filter: ${(props) => props.isDisabled && "blur(4px)"};
`;

const LogoContainer = styled.div`
  width: 60px;
  height: 100%;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: height 2s ease, opacity 1s ease 0.3s;
  overflow: hidden;
  ${ipadAndMobile({
    flexDirection: "column",
    zIndex: 3,
    backgroundColor: "black",
    width: "100vw",
    height: 0,
    position: "fixed",
    right: 0,
    top: 0,
    alignSelf: "flex-start",
    justifyContent: "space-around",
  })};
  @media (max-width: 767px) {
    height: ${({ dropped }) => (dropped ? "100vh" : 0)} !important;
    opacity: ${({ dropped }) => (dropped ? 1 : 0)};
  } ;
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
const BurgerDiv = styled.div`
  ${computer({ display: "none" })};
  margin: 3px;
  color: white;
  border-radius: 5px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 60px;
  height: 70%;
  z-index: 4;
  cursor: pointer;
`;
const BurgerSpan = styled.span`
  border: 1px solid white;
  width: 60%;
`;

function Navbar() {
  const { cart } = useContext(CartContext);
  const { pointerState } = useContext(PointerContext);
  const [cartQuant, setCartQuant] = useState();
  const [menuDropped, setMenuDropped] = useState(false);
  //anytime our cart quantity changes we update our notifications
  useEffect(() => {
    setCartQuant(cart.cartQuantity);
  }, [cart.cartQuantity]);
  //on smaller screens burger icon will provide a dropdown menu which will cover the screen onClick
  const handleBurger = () => {
    if (menuDropped) {
      setMenuDropped(false);
    }
    if (!menuDropped) {
      setMenuDropped(true);
    }
  };
  //if we click on any of the links to navigate we need to hide the dropped down menu again
  const hideDropMenu = () => {
    setMenuDropped(false);
  };

  return (
    <Container isDisabled={pointerState}>
      <LogoContainer>
        <Link to={"/"} onClick={hideDropMenu}>
          <LogoImg src={logoImg} />
        </Link>
      </LogoContainer>

      <ItemsContainer dropped={menuDropped}>
        <Link
          to="/"
          style={{ textDecoration: "none", width: "120px", flexShrink: "0" }}
          onClick={hideDropMenu}
        >
          <NavItem>Home</NavItem>
        </Link>
        <Link
          to="/dttstt"
          style={{ textDecoration: "none", width: "120px", flexShrink: "0" }}
          onClick={hideDropMenu}
        >
          <NavItem>Drink the Town, Smoke the Town</NavItem>
        </Link>
        <Link
          to="/jimmyhasty"
          style={{ textDecoration: "none" }}
          onClick={hideDropMenu}
        >
          <NavItem>Jimmy Hasty</NavItem>
        </Link>
        <Link
          to="/tommymcconville"
          style={{ textDecoration: "none" }}
          onClick={hideDropMenu}
        >
          <NavItem>Tommy McConville</NavItem>
        </Link>
        <Link
          to="/about"
          style={{ textDecoration: "none" }}
          onClick={hideDropMenu}
        >
          <NavItem>About</NavItem>
        </Link>
      </ItemsContainer>
      <CartDiv>
        <Link
          to="/cart"
          style={{ textDecoration: "none", flexShrink: "0" }}
          onClick={hideDropMenu}
        >
          <NotificationBadge
            materialUI={<ShoppingCartOutlined />}
            notificationNumber={cartQuant}
          ></NotificationBadge>
        </Link>
      </CartDiv>
      <BurgerDiv onClick={handleBurger}>
        <BurgerSpan />
        <BurgerSpan />
        <BurgerSpan />
      </BurgerDiv>
    </Container>
  );
}

export default Navbar;
