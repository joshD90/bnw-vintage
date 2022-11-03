import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { upload } from "../../utils/firebaseUpload";
import { PointerContext } from "../../context/pointerContext";

const Container = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin: 50px;
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
  &:active {
    background-color: gray;
  }
`;

function AdminProductEdit() {
  const location = useLocation();
  //grab the product id from the url
  const id = location.pathname.split("/")[3];

  const [product, setProduct] = useState();
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [file, setFile] = useState([]);
  const [secondaryFiles, setSecondaryFiles] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const { setPointerState } = useContext(PointerContext);
  const navigate = useNavigate();

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
      return setUpdatedProduct((prev) => {
        return { ...prev, [e.target.id]: options };
      });
    }
    if (e.target.id === "attributes") {
      const attr = e.target.value.split("/");
      return setUpdatedProduct((prev) => {
        return { ...prev, [e.target.id]: attr };
      });
    }
    //if not the multiple choice, we spread the prev value of the object to keep the rest of the object and append the change property with dynamic key /value pair
    setUpdatedProduct((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  //upload the file if it has been changed to a new one
  const uploadFile = async () => {
    //if they haven't changed the file skip straight to updating database
    if (file.length === 0 && secondaryFiles.length === 0)
      return sendUpdateRequest();
    //we combine both files into a single array
    let allFiles = [...file, ...secondaryFiles];
    setPointerState(true);
    try {
      let mainImage = {};
      let secondImages = {};

      //we map a new array of promises and then await all of these to be fulfilled
      //returns all of the uploaded file paths.
      const filePaths = await Promise.all(
        allFiles.map((thisFile) => upload(thisFile))
      );
      //if there is no main image then all the file paths will automatically be the secondary image
      if (file.length !== 0) {
        // if there is a main file we find the element that contains the main image file name
        mainImage.image = filePaths.find(
          (path) => path.search(file[0].name) !== -1
        );
        //we filter out the main file until we have the rest of the files
        secondImages.secondaryImages = filePaths.filter((path) => {
          return path.indexOf(file[0].name) === -1;
        });
      } else secondImages.secondaryImages = filePaths;

      //we then set the product through destructuring.  If main or secondary images are empty they will not be included
      setUpdatedProduct((prev) => {
        return {
          ...prev,
          ...mainImage,
          ...secondImages,
        };
      });
      setTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  //sends off new product information to server
  const sendUpdateRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/product/${product._id}`,
        updatedProduct,
        { withCredentials: true }
      )
      //the put request will return an object of the information that has been updated as well as what fields were updated
      .then((res) => {
        console.log(res.data);
        setPointerState(false);
        navigate(`/admin/products`);
      })
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
            <EntryLabel>Attributes</EntryLabel>
            <EntryInput
              type="text"
              id="attributes"
              defaultValue={product.attributes.map(
                (attribute) => attribute + "/"
              )}
              onChange={changeProduct}
            />
          </InputDiv>
          <InputDiv>
            <EntryLabel>Product Image</EntryLabel>
            <ExistingImg src={product.image} />
            <FileSelect
              type="file"
              onChange={(e) => setFile([e.target.files[0]])}
            />
          </InputDiv>
          <InputDiv>
            <EntryLabel>Secondary Images</EntryLabel>
            {product.secondaryImages.map((img) => (
              <ExistingImg
                style={{ width: "50px", height: "50px" }}
                src={img}
                key={img}
              />
            ))}
            <FileSelect
              type="file"
              onChange={(e) => setSecondaryFiles(Object.values(e.target.files))}
              multiple
            />
          </InputDiv>

          <UploadButton onClick={uploadFile}>Update Product</UploadButton>
        </InputsContainer>
      )}
      <Link to="/" style={{ textDecoration: "none" }}>
        <UploadButton>Go to Home</UploadButton>
      </Link>
    </Container>
  );
}

export default AdminProductEdit;
