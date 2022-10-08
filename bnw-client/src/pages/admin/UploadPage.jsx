import React, { useState, useEffect } from "react";
import { upload } from "../../utils/firebaseUpload";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.span`
  font-size: 1.5rem;
  padding: 10px 50px;
`;

const InputsContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #d4d4d4;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  padding: 5px 50px;
`;
const EntryLabel = styled.label`
  border: 1px solid gray;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 40px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EntryInput = styled.input`
  border: 1px solid gray;
  width: 240px;
  height: 40px;
  display: flex;
  align-items: center;
  background: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0;
`;
const EntrySelect = styled.select`
  height: 100%;
  width: 100px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  border: 1px solid gray;
  font-size: 1.2;
  text-align: center;
`;

const FileSelect = styled.input`
  border: 1px solid gray;
  width: 240px;
  height: 40px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 5px;
`;
const UploadButton = styled.div`
  width: 100px;
  height: 50px;
  border: 1px solid transparent;
  background-color: black;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-right: 15%;
  margin-top: 30px;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

function CreateProduct() {
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: null,
    desc: null,
    basePrice: null,
    inStock: true,
    color: [],
    image: null,
  });

  const changeProduct = (e) => {
    //for the multiple select we cant get the array of selected options by the usual method.
    if (e.target.id === "color" || e.target.id === "sizes") {
      //first access and spread all the option values
      const options = [...e.target.options]
        //we then filter these values by the selected propety
        .filter((option) => option.selected)
        //we then map the value of these to a shallow array
        .map((option) => option.label.toLowerCase());
      //exit out of the function to prevent from going on to next set product
      return setProduct((prev) => {
        return { ...prev, [e.target.id]: options };
      });
    }

    //if not the multiple choice, we spread the prev value of the object to keep the rest of the object and append the change property with dynamic key /value pair
    setProduct((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const uploadFile = async () => {
    //check if there is a file to be uploaded
    if (!file) return console.log("you need to attach a product picture");
    //we upload the file to firebase and this returns a url that we can pass to the server
    console.log(file, "file object");
    const filePath = await upload(file);
    console.log("filePath has returned");
    //we update the product state - a useEffect is triggered to make an axios request once this state.image changes
    setProduct((prev) => {
      return { ...prev, image: filePath };
    });
  };

  useEffect(() => {
    //we don't want to make the axios request as soon as the page loads
    if (!product.image) return;
    console.log("we have hit the use effect as state.image has changed");
    //send off the data to the server
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/product`, product)
      .then((res) => {
        console.log(res.data);
      });
  }, [product.image]);

  return (
    <Container>
      <InputsContainer>
        <Header>Create New Product</Header>
        <InputDiv>
          <EntryLabel>Product Name :</EntryLabel>
          <EntryInput
            type="text"
            placeholder="Product Name Here"
            id="name"
            onChange={changeProduct}
          ></EntryInput>
        </InputDiv>
        <InputDiv>
          <EntryLabel>Description</EntryLabel>
          <EntryInput
            type="text"
            placeholder="Description Here"
            id="desc"
            onChange={changeProduct}
          />
        </InputDiv>
        <InputDiv>
          <EntryLabel>Base Price</EntryLabel>
          <EntryInput
            type="text"
            placeholder="Only Enter Numbers Here"
            id="basePrice"
            onChange={changeProduct}
          />
        </InputDiv>
        <InputDiv>
          <EntryLabel>In Stock</EntryLabel>
          <EntrySelect id="inStock" onChange={changeProduct}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </EntrySelect>
        </InputDiv>
        <InputDiv>
          <EntryLabel>Colors</EntryLabel>
          <EntrySelect multiple id="color" onChange={changeProduct}>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="white">White</option>
          </EntrySelect>
        </InputDiv>
        <InputDiv>
          <EntryLabel>Available Sizes</EntryLabel>
          <EntrySelect multiple id="sizes" onChange={changeProduct}>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </EntrySelect>
        </InputDiv>
        <InputDiv>
          <EntryLabel>Product Image</EntryLabel>
          <FileSelect
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </InputDiv>

        <UploadButton onClick={uploadFile}>Upload Now</UploadButton>
      </InputsContainer>
    </Container>
  );
}

export default CreateProduct;
