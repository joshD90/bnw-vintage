import React, { useState, useContext } from "react";
import { signIn } from "../../utils/firebaseAuth";
import { AuthContext } from "../../context/authContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const LoginDiv = styled.div`
  width: 40%;
  height: 400px;
  box-shadow: 3px 3px 5px 5px gray;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e4e4e4;
`;

const LoginHeader = styled.div`
  margin-bottom: 100px;
  font-size: 1.5rem;
  font-weight: 500;
  width: 80%;
  text-align: center;
`;
const EntryDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EntryLabel = styled.label`
  border: 1px solid gray;
  border-radius: 5px;
  height: 40px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EntryInput = styled.input`
  border: 1px solid gray;
  height: 40px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 5px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  width: 100px;
  height: 60px;
  background-color: green;
  color: white;
  font-size: 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2ba522;
  }
`;
//this page will simultaineously log the user is with firebase as well as our backend server
function AdminLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      //firebase automatically sets our sign in object so we do not need to do anything with this
      const signInObject = await signIn(email, password);
      //this is the section that logs us in with the backend.  There is only one admin user set up and both passwords and user needs to match
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        {
          email: email,
          password: password,
        },
        //with credentials allows us to send cookie information over with the request
        { withCredentials: true }
      );
      //on a successful response from backend we can move to the rest of the admin section
      console.log("should be successfully signed in");
      navigate("/admin/products/create");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <LoginDiv>
        <LoginHeader>Please Enter Admin Credentials To Proceed</LoginHeader>
        <EntryDiv>
          <EntryLabel>Email : </EntryLabel>
          <EntryInput
            type="email"
            placeholder="enter email here"
            onChange={(e) => setEmail(e.target.value)}
          />
        </EntryDiv>
        <EntryDiv>
          <EntryLabel>Password : </EntryLabel>
          <EntryInput
            type="password"
            placeholder="enter password here"
            onChange={(e) => setPassword(e.target.value)}
          />
        </EntryDiv>
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </LoginDiv>
    </Container>
  );
}

export default AdminLogin;
