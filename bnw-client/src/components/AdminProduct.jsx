import { Delete, LineAxisOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  background-color: #f7f7f7;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  width: 90%;
  height: 200px;
  overflow: hidden;
  margin-bottom: 10px;
`;
const ProductImage = styled.img`
  height: 100%;
  object-fit: cover;
`;
const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
  width: 100%;
`;
const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const DetailLabel = styled.span`
  font-weight: 700;
  width: 120px;
`;
const DetailValue = styled.span`
  margin-left: 20px;
`;

const EditDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100px;
  height: 100%;
`;
const DeleteIconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  color: gray;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
const EditButton = styled.button`
  margin-right: 15px;
  margin-bottom: 15px;
`;

//this is the product contained on the protected Admin Product page and will be iterated per product on
//the page
function AdminProduct({ product }) {
  //this will be used in the edit button component to navigate to the admin single product page
  const navigate = useNavigate();
  //handle the deletion of a product
  const handleDelete = async () => {
    //hit the backend server
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/product/${product._id}`,
        { withCredentials: true }
      );
      //navigate(0) reloads the current page
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <ProductImage src={product.image} />
      <DetailsDiv>
        <DetailsContainer>
          <DetailLabel>ProductId</DetailLabel>
          <DetailValue>{product._id}</DetailValue>
        </DetailsContainer>
        <DetailsContainer>
          <DetailLabel>Name</DetailLabel>
          <DetailValue>{product.name}</DetailValue>
        </DetailsContainer>
        <DetailsContainer>
          <DetailLabel>Description</DetailLabel>
          <DetailValue>{product.desc}</DetailValue>
        </DetailsContainer>
        <DetailsContainer>
          <DetailLabel>Price</DetailLabel>
          <DetailValue>€ {product.basePrice}</DetailValue>
        </DetailsContainer>
        <DetailsContainer>
          <DetailLabel>Colors Available</DetailLabel>
          <DetailValue>
            {product.color.map((color, index) => (
              <span style={{ marginRight: "10px" }} key={index}>
                {color}
              </span>
            ))}
          </DetailValue>
        </DetailsContainer>
        <DetailsContainer>
          <DetailLabel>Sizes Available</DetailLabel>
          <DetailValue>
            {product.sizes.map((size, index) => (
              <span style={{ marginRight: "10px" }} key={index}>
                {size.toUpperCase()}
              </span>
            ))}
          </DetailValue>
        </DetailsContainer>
        <DetailsContainer>
          <DetailLabel>Price</DetailLabel>
          <DetailValue>€ {product.price}</DetailValue>
        </DetailsContainer>
      </DetailsDiv>
      <EditDiv>
        <DeleteIconDiv onClick={handleDelete}>
          <Delete style={{ color: "inherit" }} />
        </DeleteIconDiv>
        <EditButton
          onClick={() => navigate(`/admin/products/${product._id}/edit`)}
        >
          Edit
        </EditButton>
      </EditDiv>
    </Container>
  );
}

export default AdminProduct;
