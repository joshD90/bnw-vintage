import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PointerContext } from "../context/pointerContext";
import { mobile, ipad, computer, ipadAndMobile } from "../responsive";

const Container = styled.div`
  position: fixed;
  height: 600px;
  width: 60vw;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: 20vw;
  background-color: #d5d5d5;
  z-index: 5;
  scroll-behavior: auto;
  overflow: scroll;
  ${ipad({
    width: "80vw",
    left: "10vw",
  })}
  ${mobile({
    width: "100vw",
    left: 0,
    height: "auto",
  })}
`;

const ShippingHeader = styled.span`
  text-align: center;
  font-size: 1.6rem;
  width: 100%;
`;

const InputsDiv = styled.div`
  height: 100%;
  flex: 4;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;

  ${ipadAndMobile({ width: "100%", alignItems: "center" })}
`;

const InputWrapper = styled.div`
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 5px;
  margin-top: 10px;
  width: 80%;
`;
const InputLabel = styled.label`
  width: 100%;
  color: #444444;
`;
const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid gray;
  height: 40px;
`;

const DivideLine = styled.hr`
  width: 90%;
  border-width: 1px;
  border-style: solid;
  border-color: gray;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  ${computer({ flex: 1 })};
  ${ipadAndMobile({ width: "100%", margin: "30px 0 5px" })}
`;

const PayButton = styled.button`
  border-style: none;
  height: 50px;
  width: 120px;
  color: white;
  background-color: black;
  cursor: pointer;
  ${ipadAndMobile({ width: "80%", marginBottom: "15px" })};
  &:hover {
    border: solid 2px black;
    background-color: white;
    color: black;
  }
`;
//this will display prior to payment to capture shipping details
function ShippingAddress({ shipping, setShipping, func, setShippingVisible }) {
  const { setPointerState } = useContext(PointerContext);
  const location = useLocation();
  const navigate = useNavigate();
  //this will disable the mouse for background elements such as navbar footer and the rest of the cart
  useEffect(() => {
    setPointerState(true);
  }, [location]);
  //this will dynamically take any input and alter the overall Shipping Address object subbing in the id for the key
  //and the value for value
  const handleChange = (e) => {
    setShipping((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  //on clicking the pay button, this will trigger the func prop in the cart product (handlePay)
  return (
    <Container>
      <ShippingHeader>Please Enter Your Shipping Details Here</ShippingHeader>
      <InputsDiv>
        <InputWrapper>
          <InputLabel>First Name</InputLabel>
          <Input
            placeholder="First Name Here"
            onChange={handleChange}
            id="fName"
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Second Name</InputLabel>
          <Input
            placeholder="Second Name Here"
            onChange={handleChange}
            id="sName"
          />
        </InputWrapper>
        <DivideLine />
        <InputWrapper>
          <InputLabel>Address Line 1</InputLabel>
          <Input
            placeholder="Apartment / House Number"
            onChange={handleChange}
            id="address1"
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Address Line 2 </InputLabel>
          <Input
            placeholder="Street Name"
            onChange={handleChange}
            id="address2"
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Address Line 3</InputLabel>
          <Input
            placeholder="Town / City"
            onChange={handleChange}
            id="address3"
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>County</InputLabel>
          <Input placeholder="County" onChange={handleChange} id="address4" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>
            Contact Number *to contact in case of issues with delivery
          </InputLabel>
          <Input
            placeholder="Contact Number"
            onChange={handleChange}
            id="contactNum"
          />
        </InputWrapper>
      </InputsDiv>
      <ButtonDiv>
        <PayButton
          onClick={() => {
            func();
            setShippingVisible(false);
            setPointerState(false);
          }}
        >
          Go to Payment
        </PayButton>
        <PayButton
          onClick={() => {
            setShippingVisible(false);
            setPointerState(false);
          }}
        >
          Return to Cart
        </PayButton>
      </ButtonDiv>
    </Container>
  );
}

export default ShippingAddress;
