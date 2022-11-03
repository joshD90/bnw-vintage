import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 30px;
`;
const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 450px;
  flex-wrap: wrap;
  background-color: red;
  border: 1px solid gray;
  border-radius: 5px;
  overflow: hidden;
  background-color: #d2d2d2;
  padding: 10px;
  flex-direction: column;
`;
const CustomerSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;
const AddressUl = styled.ul`
  list-style: none;
  font-weight: 600;
  padding: 0;
  width: 60%;
`;
const AddressLi = styled.li`
  margin: 0;
  padding: 0;
`;
const DivideLine = styled.hr`
  width: 60%;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  margin: 0 auto;
`;
const ProductSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 1px solid gray;
  margin: 10px 5px;
`;
const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  width: 120px;
  justify-content: space-between;
`;

const ProductImg = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
`;

const ProductQuantity = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  margin: 10px 0%;
`;
const StatusSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Status = styled.span`
  width: 100%;
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
`;
const StatusSelectLabel = styled.label`
  width: 60%;
  display: flex;
  align-items: flex-start;
`;
const StatusSelect = styled.select`
  width: 60%;
  background-color: black;
  color: white;
  height: 40px;
  text-align: center;
  font-size: 1.1rem;
`;
const StatusSave = styled.button`
  width: 130px;
  background-color: #11a027;
  padding: 5px;
  font-size: 0.9rem;
  border-radius: 5px;
  margin: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #22bf3c;
  }
  &:active {
    background-color: gray;
  }
`;

//This is the single admin order within the protected Admin Order's.  This will be iterated
//per order
function AdminOrder({ order, updateOrders }) {
  //this holds the infomation on the Sent / Pending Status of an order
  const [status, setStatus] = useState(null);

  //sends request to backend to update an order.  With credentials allows us to pass on cookie session info
  const saveChanges = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/booking/`,
        { id: order._id, status: status },
        { withCredentials: true }
      )
      .then((res) =>
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/booking`, {
            withCredentials: true,
          })
          .then((response) => {
            //updateOrders is a function found in AdminOrders.jsx of which this is contained
            updateOrders(response.data);
            //return our status state to null until this is changed again
            setStatus(null);
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <OrderContainer>
        <CustomerSection>
          <h2>
            {order.fName} {order.sName}
          </h2>
          <AddressUl>
            <AddressLi>{order.address1}</AddressLi>
            <AddressLi>{order.address2}</AddressLi>
            <AddressLi>{order.address3}</AddressLi>
            <AddressLi>{order.address4}</AddressLi>
          </AddressUl>
          <span>Contact Number: {order.contactNum}</span>
        </CustomerSection>
        <DivideLine />
        <ProductSection>
          {order.products.map((product, index) => {
            return (
              <Product key={index}>
                <ProductImg src={product.image} alt="product" />
                <span>{product.name}</span>
                <ProductQuantity>
                  <span>Quantity: </span> {product.quantity}
                </ProductQuantity>
              </Product>
            );
          })}
        </ProductSection>
        <StatusSection>
          <Status>{order.sent ? "Sent" : "Pending"}</Status>
          <StatusSelectLabel>Update Status</StatusSelectLabel>
          <StatusSelect
            defaultValue={order.sent ? "Sent" : "Pending"}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Sent</option>
            <option>Pending</option>
          </StatusSelect>
          {status && (
            <StatusSave onClick={saveChanges}>Save Changes</StatusSave>
          )}
        </StatusSection>
      </OrderContainer>
    </Container>
  );
}

export default AdminOrder;
