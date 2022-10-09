import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { upload } from "../../utils/firebaseUpload";

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
  height: 40px;
  padding: 0;
  margin: 0;
  width: 100px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  border: 1px solid gray;
  font-size: 1.2;
  text-align: center;
  overflow: scroll;
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
const ExistingImg = styled.img`
  height: 100px;
  width: 100px;
`;
const UploadButton = styled.div`
  width: 120px;
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
  flex-shrink: 0;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

function AdminProductEdit() {
  const location = useLocation();
  //grab the product id from the url
  const id = location.pathname.split("/")[3];

  const [product, setProduct] = useState();
  const [file, setFile] = useState(null);
  const [trigger, setTrigger] = useState(0);

  //get the product details so we can prefill the form
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, []);

  //This will trigger once the new product path has been set
  //in the case of an image being uploaded
  useEffect(() => {
    if (trigger === 0) return;
    sendUpdateRequest();
  }, [trigger]);

  //update our product with any changes
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
  //upload the file if it has been changed to a new one
  const uploadFile = async () => {
    //if they haven't changed the file skip straight to updating database
    if (!file) return sendUpdateRequest();
    try {
      const filePath = await upload(file);
      setProduct((prev) => {
        return { ...prev, image: filePath };
      });
      setTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  //sends off new product information to server
  const sendUpdateRequest = () => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/product/${product._id}`, product)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      {product && (
        <InputsContainer>
          <Header>Edit {product && product.name}</Header>
          <InputDiv>
            <EntryLabel>Product Name :</EntryLabel>
            <EntryInput
              type="text"
              placeholder="Product Name Here"
              id="name"
              defaultValue={product && product.name}
              onChange={changeProduct}
            ></EntryInput>
          </InputDiv>
          <InputDiv>
            <EntryLabel>Description</EntryLabel>
            <EntryInput
              type="text"
              placeholder="Description Here"
              id="desc"
              defaultValue={product && product.desc}
              onChange={changeProduct}
            />
          </InputDiv>
          <InputDiv>
            <EntryLabel>Base Price</EntryLabel>
            <EntryInput
              type="text"
              placeholder="Only Enter Numbers Here"
              id="basePrice"
              defaultValue={product && product.basePrice}
              onChange={changeProduct}
            />
          </InputDiv>
          <InputDiv>
            <EntryLabel>In Stock</EntryLabel>
            <EntryInput value={product.inStock} readOnly />
            <EntrySelect
              id="inStock"
              onChange={changeProduct}
              defaultValue={product && product.inStock}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </EntrySelect>
          </InputDiv>
          <InputDiv>
            <EntryLabel>Colors</EntryLabel>
            <EntryInput value={product.color} readOnly />
            <EntrySelect
              multiple
              id="color"
              onChange={changeProduct}
              defaultValue={product.color}
            >
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
            <EntryInput value={product.sizes} readOnly />
            <EntrySelect
              multiple
              id="sizes"
              onChange={changeProduct}
              defaultValue={product.sizes}
            >
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </EntrySelect>
          </InputDiv>
          <InputDiv>
            <EntryLabel>Product Image</EntryLabel>
            <ExistingImg src={product && product.image} />
            <FileSelect
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </InputDiv>

          <UploadButton onClick={uploadFile}>Update Product</UploadButton>
        </InputsContainer>
      )}
    </Container>
  );
}

export default AdminProductEdit;
