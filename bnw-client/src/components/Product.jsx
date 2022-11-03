import { Add, Preview, Remove } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../context/cartContext";
import { ipadAndMobile, ipad, mobile } from "../responsive";

const ProductDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 500px;
  margin: 50px 40px;
  background-color: #f2f2f2;
  border-radius: 5px;
  overflow: hidden;
  ${ipadAndMobile({ flexDirection: "column-reverse" })}
  ${mobile({ margin: "50px 0px" })}
`;
const ProductDescription = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 50%;
  ${ipadAndMobile({ width: "100%" })}
`;
const ProductDescHead = styled.h1`
  margin: 15px 15px;
  max-width: 80%;
`;
const ProductDescBody = styled.span`
  margin: 20px 15px;
  max-width: 80%;
`;
const ProductDescPrice = styled.span`
  font-size: 3rem;
  font-weight: 300;
  margin: 30px 15px;
`;

const ProductAttr = styled.div`
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;
const ProductColorDiv = styled.div`
  display: flex;
  align-items: center;
`;
const ProductColorLabel = styled.div`
  margin-right: 10px;
`;
const ProductColor = styled.div`
  background-color: black;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

const ProductSizeDiv = styled.div`
  margin-right: 20px;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const ProductSizeLabel = styled.span`
  font-size: 1rem;
  margin-right: 10px;
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
`;
const ProductSelect = styled.select`
  border-style: solid black 1px;
  width: 60%;
  text-align: center;
  height: 100%;
`;

const ProductImageDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${ipad({ width: "80%" })};
  ${mobile({ width: "90%" })};
`;
const MainImgHolder = styled.div`
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProductImage = styled.img`
  width: ${(props) => (props.secondImg ? "70%" : "100%")};
  height: ${(props) => (props.secondImg ? "70%" : "100%")};
  object-fit: cover;
`;
const SecondImage = styled.img`
  height: 100px;
  margin: 10px 5px;
  ${ipad({ height: "70px" })};
  ${mobile({ height: "50px" })};
`;

const PurchaseDiv = styled.div`
  margin: 30px 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const QuantityDiv = styled.div`
  display: flex;
`;
const Quantity = styled.div`
  border-radius: 5px;
  border: solid black 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  margin: 0 5px;
`;
const PurchaseButton = styled.button`
  border-style: none;
  height: 50px;
  color: white;
  background-color: black;
  cursor: pointer;
  &:hover {
    border: solid 2px black;
    background-color: white;
    color: black;
  }
  &:active {
    background-color: gray;
  }
`;
const AddBanner = styled.div`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  height: 30px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #2ca323;
  color: white;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 3s ease;
  align-items: center;
  justify-content: center;
`;
//this is the product that will be display on the SingleProduct Page
function Product({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const [prodQuant, setProdQuant] = useState(0);
  const [prodSize, setProdSize] = useState("S");
  const [addBanner, setAddBanner] = useState(false);
  const [mainImage, setMainImage] = useState(product ? product.img : null);
  //change the quantity button + or -
  const changeQuantity = (direction) => {
    if (prodQuant + direction < 0) return;
    setProdQuant((prev) => prev + direction);
  };
  //this will add the product to our Cart which is context
  const addToCart = () => {
    //we dont want to have multiple entries of the same product instead add the quantities together
    if (
      cart.products.some((elem) => {
        return elem.id === product.productId;
      })
    ) {
      //find the index of the cart product that contains the id
      const productIndex = cart.products.findIndex(
        (elem) => elem.id == product.productId
      );
      //using the index we can adjust the cart quantity
      cart.products[productIndex].quantity += prodQuant;
      //we update our local storage as well as our cart
      localStorage.setItem("cart", JSON.stringify(cart));
      return setCart(cart);
    }
    //if the cart does not already have the product in the cart we add the product to the cart
    //we create the updated cart object using spread operators to preserve the existing cart
    const updatedCart = {
      ...cart,
      products: [
        ...cart.products,
        {
          name: product.head,
          quantity: prodQuant,
          size: prodSize,
          price: product.price,
          color: "black",
          img: product.img,
          id: product.productId,
        },
      ],
      cartQuantity: (cart.cartQuantity += 1),
    };
    //add the item to local storage to persist over reloading. Update the cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    //we flash a banner at the top of the page to notify that something has been added to the cart
    setAddBanner(true);
    setTimeout(() => setAddBanner(false), 3500);
  };

  return (
    <ProductDiv>
      <ProductDescription>
        <ProductDescHead>{product.head}</ProductDescHead>
        <ProductDescBody>{product.body}</ProductDescBody>
        <ul>
          {product.productAttr &&
            product.productAttr.map((attr) => <li key={attr}>{attr}</li>)}
        </ul>
        <ProductDescPrice>€ {product.price}</ProductDescPrice>
        <ProductAttr>
          <ProductColorDiv>
            <ProductColorLabel>Color Range: </ProductColorLabel>
            <ProductColor />
            <ProductColor />
          </ProductColorDiv>
          <ProductSizeDiv>
            <ProductSizeLabel>Size: </ProductSizeLabel>
            <ProductSelect onChange={(e) => setProdSize(e.target.value)}>
              {product.sizes.map((size) => (
                <option key={size}>{size.toUpperCase()}</option>
              ))}
            </ProductSelect>
          </ProductSizeDiv>
        </ProductAttr>
        <PurchaseDiv>
          <QuantityDiv>
            <Remove
              style={{ cursor: "pointer" }}
              onClick={() => changeQuantity(-1)}
            />
            <Quantity>{prodQuant}</Quantity>
            <Add
              style={{ cursor: "pointer" }}
              onClick={() => changeQuantity(1)}
            />
          </QuantityDiv>
          <PurchaseButton onClick={addToCart}>Add To Cart</PurchaseButton>
        </PurchaseDiv>
      </ProductDescription>
      <ProductImageDiv>
        <MainImgHolder style={{ flexBasis: "100%" }}>
          <ProductImage
            src={mainImage}
            secondImg={product.secondImg}
          ></ProductImage>
        </MainImgHolder>
        {product &&
          product.secondImg &&
          product.secondImg.map((elem) => (
            <SecondImage
              src={elem}
              onMouseEnter={() => setMainImage(elem)}
              onMouseLeave={() => setMainImage(product.img)}
            />
          ))}
      </ProductImageDiv>
      <AddBanner isVisible={addBanner}>
        Your Purchase Has been Added to Your Cart
      </AddBanner>
    </ProductDiv>
  );
}

export default Product;
