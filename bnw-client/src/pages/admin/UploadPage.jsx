import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { upload } from "../../utils/firebaseUpload";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PointerContext } from "../../context/pointerContext";

const Container = styled.div`
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
`;

const CenterPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100vh;
`;

const Header = styled.span`
  font-size: 1.5rem;
  padding: 10px 50px;
  width: 100%;
  text-align: center;
`;
const InputsContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #d4d4d4;
  position: relative;
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  padding: 5px 10px;
  margin-top: 20px;
`;
const EntryLabel = styled.label`
  border: 1px solid gray;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 40px;
  width: 120px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EntryInput = styled.input`
  border: 1px solid gray;
  width: 100%;
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
  width: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  border: 1px solid gray;
  font-size: 1.2;
  text-align: center;
`;

const FileLabel = styled.label`
  width: 100%;
  border: solid 1px gray;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const FileSelect = styled.input`
  display: none;
`;

const SecondaryFileNames = styled.span`
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 100%;
  word-wrap: break-word;
  height: 60px;
  overflow-y: scroll;
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  margin: 5px;
  height: 150px;
  border: dashed 1px gray;
  border-radius: 5px;
  overflow: hidden;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-right: 15%;
  flex-shrink: 0;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
  &:active {
    background-color: gray;
  }
`;

function CreateProduct() {
  //set up our state and set state
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [secondaryFiles, setSecondaryFiles] = useState([]);
  const { setPointerState } = useContext(PointerContext);
  const navigate = useNavigate();
  //we set up an empty object with the keys already present for ease of destructuring this later
  const [product, setProduct] = useState({
    name: null,
    desc: null,
    basePrice: null,
    inStock: true,
    color: [],
    image: null,
  });
  //when we set the main image we want to display this as an image so the user can view which file
  //they have selected.  We create an temp object url so that we can feed this into the image src
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
  };
  //e.target.files returns an object where each value of each key value pair is a file.
  //object.values grabs the files only and places them into a shallow array
  const secondaryFileChange = (e) => {
    setSecondaryFiles(Object.values(e.target.files));
  };

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
    //the attributes are pass as a single string so we split these into an array
    const arrayedAttributes = product.attributes.split("/");

    //check if there is a file to be uploaded
    if (!file) return console.log("you need to attach a product picture");
    //we upload the file to firebase and this returns a url that we can pass to the server
    const filePath = await upload(file);
    //return result as a promise so we can call this function asyncronously
    return new Promise((resolve, reject) => {
      resolve({ image: filePath, attributes: arrayedAttributes });
    });
  };
  //for our secondary images we need to wait until all are uploaded
  const uploadSecondaryFiles = () => {
    //don't bother with the function if there are no files to upload
    if (secondaryFiles.length === 0) return;
    //return this as a promise as we will have to call this function asyncronously
    return new Promise(async (resolve, reject) => {
      try {
        //this will run all the async uploads and promise.all waits for all of the array of promises to run
        //before returning.
        const filePathArray = await Promise.all(
          secondaryFiles.map((singleFile) => upload(singleFile))
        );
        //on success return our image paths
        resolve({ secondaryImages: filePathArray });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
  //this will upload the main image and then upload the secondary files after
  const saveProduct = async () => {
    setPointerState(true);
    try {
      //call these files asyncronously
      const mainFilePath = await uploadFile();
      const secondaryFilePaths = await uploadSecondaryFiles();
      //once these have returned their url's combine them using spread operators to preserve the state
      //of the rest of the product object
      const fullProduct = {
        ...product,
        ...mainFilePath,
        ...secondaryFilePaths,
      };
      //we then pass this new product object to the backend
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/product`,
        fullProduct,
        //withCredentials so we can pass our passport session cookie to the backend
        {
          withCredentials: true,
        }
      );
      //should probably redirect to all products or flash a message
      setPointerState(false);
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <CenterPanel>
        <Header>Create New Product</Header>
        <InputsContainer>
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
            <EntryLabel>Product Properties</EntryLabel>
            <EntryInput
              type="text"
              placeholder="Enter All Attributes here seperate Each one with /"
              id="attributes"
              onChange={changeProduct}
            />
          </InputDiv>

          <InputDiv style={{ position: "absolute", left: 0, bottom: 0 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <UploadButton>Go To Home Page</UploadButton>
            </Link>
          </InputDiv>
          <div style={{ height: "200px" }} />
        </InputsContainer>

        <InputsContainer>
          <InputDiv>
            <FileLabel htmlFor="fileSelect">
              {!file ? "Product Image" : file.name}
              <FileSelect
                id="fileSelect"
                type="file"
                onChange={handleFileChange}
              />
            </FileLabel>
          </InputDiv>
          <ImgContainer>
            <Img src={fileUrl} alt="No Image Selected Yet" />
          </ImgContainer>

          <InputDiv>
            <FileLabel htmlFor="multipleFile">
              Secondary Files
              <FileSelect
                id="multipleFile"
                type="file"
                multiple
                onChange={secondaryFileChange}
              />
            </FileLabel>
          </InputDiv>

          <SecondaryFileNames>
            {secondaryFiles.map((file) => file.name + " ")}
          </SecondaryFileNames>

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
          <InputDiv
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              justifyContent: "flex-end",
            }}
          >
            <UploadButton onClick={saveProduct}>Upload Now</UploadButton>
          </InputDiv>
          <div style={{ height: "200px" }} />
        </InputsContainer>
      </CenterPanel>
    </Container>
  );
}

export default CreateProduct;
