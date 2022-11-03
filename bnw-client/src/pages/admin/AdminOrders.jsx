import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Order from "../../components/AdminOrder";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f7f7f7;
  min-height: 100vh;
  width: 100vw;
  flex-wrap: wrap;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  font-size: 2rem;
`;

const StatusFilterDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
`;
const FilterLabel = styled.label`
  width: 30%;
`;
const FilterSelect = styled.select`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;
//this page shows all the orders that have been made
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  //we can filter the orders by all / sent / pending
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };
  //every time the status filter changes we make a request to the back end which will aggregate
  //our orders based on whether they have a status of sent or not
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/booking?status=${statusFilter}`, {
        withCredentials: true,
      })
      .then((res) => {
        //set the orders and we will iterate through this component feeding the information from this response object
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, [statusFilter]);
  return (
    <Container>
      <HeaderDiv>Orders</HeaderDiv>
      <StatusFilterDiv>
        <FilterLabel>View Only Sent or Unsent Orders</FilterLabel>
        <FilterSelect onChange={handleStatusFilter}>
          <option value="all">View All</option>
          <option value="sent">Sent</option>
          <option value="pending">Pending</option>
        </FilterSelect>
      </StatusFilterDiv>
      {orders.length !== 0 &&
        orders.map((order) => (
          <Order order={order} key={order._id} updateOrders={setOrders} />
        ))}
    </Container>
  );
}

export default AdminOrders;
