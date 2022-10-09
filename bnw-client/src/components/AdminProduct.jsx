import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tommyShirt from "../assets/tommy_mcconville/tommy_mcconville_shirt.jpg";

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
  justify-content: flex-end;
  align-items: flex-end;
  width: 100px;
  height: 100%;
`;
const EditButton = styled.button`
  margin-right: 15px;
  margin-bottom: 15px;
`;

function AdminProduct({ product }) {
  const navigate = useNavigate();
  return (
    <Container>
      <ProductImage src={tommyShirt} />
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
          <DetailValue>€ {product.price}</DetailValue>
        </DetailsContainer>
        <DetailsContainer>
          <DetailLabel>Colors Available</DetailLabel>
          <DetailValue>
            {product.color.map((color) => (
              <span style={{ marginRight: "10px" }}>{color}</span>
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
      </DetailsDiv>
      <EditDiv>
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
