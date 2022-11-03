import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Product from "../components/Product";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

function SingleProduct() {
  const location = useLocation();
  //get the id by getting the last element of the array that is made from splitting the path on every "/"
  const id = location.pathname.split("/")[2];

  const [thisProduct, setThisProduct] = useState(null);

  //make a request to backend server for specific document using the id in params
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/${id}`)
      .then((res) => {
        //the product component was initially set up in such a way that does not match the model and so we
        //adjust the data which we will pass through to product
        const adjustedData = {
          head: res.data.name,
          body: res.data.desc,
          price: res.data.basePrice,
          sizes: res.data.sizes,
          img: res.data.image,
          secondImg: res.data.secondaryImages,
          productId: id,
          productAttr: res.data.attributes,
        };
        setThisProduct(adjustedData);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Container>{thisProduct && <Product product={thisProduct} />}</Container>
  );
}

export default SingleProduct;
