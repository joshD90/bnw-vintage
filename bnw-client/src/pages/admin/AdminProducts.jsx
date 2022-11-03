import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminProduct from "../../components/AdminProduct";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;
const ProductsContainer = styled.div`
  width: 90%;
  min-height: 90vh;
  background-color: #e3e3e3;
`;

function AdminProducts() {
  //set the state of our products
  const [products, setProducts] = useState(null);
  //make a get request to our backend which will serve  all the products
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/`, {
        withCredentials: true,
      })
      //
      .then((res) => {
        //on a positive response we set the data to our products which will be iterated through
        //feeding the information into that component
        setProducts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Container>
      <ProductsContainer>
        {products &&
          products.map((elem) => (
            <AdminProduct product={elem} key={elem._id} />
          ))}
      </ProductsContainer>
    </Container>
  );
}

export default AdminProducts;
