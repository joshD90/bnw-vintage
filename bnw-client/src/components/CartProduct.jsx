import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Add, Delete, Remove } from "@mui/icons-material";
import { CartContext } from "../context/cartContext";
import { ipad, ipadAndMobile, mobile, computer } from "../responsive";

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${computer({ height: "8rem" })};
  width: 100%;
  border: 1px solid lightgray;
  flex-wrap: wrap;
  margin: 0 20px 10px 0px;
  background-color: #e3e3e3;
  ${ipadAndMobile({ margin: "0 0 10px 0" })}
`;
const ProductImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 150px;
  ${mobile({ width: "100px" })}
`;
const ProductDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 10px;
  height: 100%;
  ${computer({ flex: 3 })};
  ${ipadAndMobile({ width: "90%", marginLeft: 0 })}
  @media (max-width:768px) {
    &:nth-child(2) {
      order: -1;
    }
  }
`;
const ProductDetail = styled.span`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;
const ColorBall = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-left: 5px;
`;
const ProductAmountDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1.5;
  ${computer({ border: "1px solid lightgray" })}
  height: 100%;
`;
const ProductQuantDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ProductQuantNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: solid 1px gray;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  margin: 0 5px;
`;
const ProductPrice = styled.span`
  margin: 20px;
  font-size: 1.5rem;
  color: gray;
`;

const ProductRemoveDiv = styled.div`
  width: 8%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  border: 1px solid lightgray;
  @media (max-width: 768px) {
    align-self: flex-start;
    &:nth-child(4) {
      order: -1;
    }
  }
`;

const IconContainer = styled.div`
  height: 20px;
  width: 20px;
  color: #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease;
  margin: 5px 5px 0 0;

  cursor: pointer;
  &:hover {
    color: black;
    height: 30px;
    width: 30px;
  }
`;
//this is found on the cart page and will be iterated through per each cart product
function CartProduct({ product }) {
  //get our cart from Context.  Set Cart allows us to alter the state from within this component
  const { cart, setCart } = useContext(CartContext);
  //increments the quantity must be purchased
  const handleClick = (amount) => {
    //find the product within the cart's product array
    const productIndex = cart.products.findIndex(({ id }) => id === product.id);
    //if decreasing the button any less than 0 exit this as you cannot have minus products
    if (cart.products[productIndex].quantity + amount < 0) return;
    cart.products[productIndex].quantity += amount;
    //update our cart
    setCart({ ...cart });
  };
  //deletes this cart product item
  const handleDelete = (id) => {
    //filter out the product that matches this components id
    const remainingProducts = cart.products.filter((elem) => elem.id !== id);
    //change the number of products in the cart
    const newCartQuant = (cart.cartQuantity -= 1);
    //we don't want to complete reset the cart, just the bits that have been changed so destructure / spread
    const newCart = {
      ...cart,
      products: remainingProducts,
      cartQuantity: newCartQuant,
    };
    //set the updated cart to local storage and update our cart state
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  return (
    <ProductContainer>
      <ProductImage src={product.img} />
      <ProductDetailDiv>
        <ProductDetail>
          <b>Product: </b> {product.name}
        </ProductDetail>
        <ProductDetail>
          <b>ID: </b> {product.id}
        </ProductDetail>
        <ProductDetail>
          <b>Size: </b> {product.size}
        </ProductDetail>
        <ProductDetail>
          <b>Color: </b> <ColorBall color={product.color} />
        </ProductDetail>
      </ProductDetailDiv>
      <ProductAmountDiv>
        <ProductQuantDiv>
          <Remove
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(-1)}
          />
          <ProductQuantNum>{product.quantity}</ProductQuantNum>
          <Add style={{ cursor: "pointer" }} onClick={() => handleClick(1)} />
        </ProductQuantDiv>
        <ProductPrice>€ {product.price}</ProductPrice>
      </ProductAmountDiv>
      <ProductRemoveDiv>
        <IconContainer onClick={() => handleDelete(product.id)}>
          <Delete />
        </IconContainer>
      </ProductRemoveDiv>
    </ProductContainer>
  );
}

export default CartProduct;
