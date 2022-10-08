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
  const [products, setProducts] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/`)
      .then((res) => {
        console.log(res.data);
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
