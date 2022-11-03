import React, { useContext, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import styled from "styled-components";
import { logout } from "../utils/firebaseAuth";
import { auth } from "../firebase";
import LoadingNotification from "./LoadingNotification";
import { PointerContext } from "../context/pointerContext";

const Container = styled.div`
  pointer-events: ${(props) => props.mouseDisabled && "none"};
`;

//this is reusable for all out "navbar" buttons
const LogoutButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
`;

const LogoutButton = styled.button`
  width: 150px;
  background-color: #11a027;
  padding: 5px;
  font-size: 1.4rem;
  border-radius: 5px;
  margin: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #22bf3c;
  }
`;

//this component wraps around other components and protects them if the user is not logged in
//sensitve data is protected through the backend however this gives an additional level of protection.
//this will protect our admin section
function ProtectedAdminRoute() {
  //get our user from our context which has been placed there by Firebase
  const { user } = useContext(AuthContext);
  const { pointerState } = useContext(PointerContext);
  const navigate = useNavigate();
  //if there is no user then exit this functional component return us to the login section.
  if (!user) return <Navigate to="/admin/login" replace />;
  //otherwise continue to render everything else
  function handleLogout() {
    //logout is imported from our fireBaseAuth in utils
    logout();
  }

  return (
    <Container mouseDisabled={pointerState}>
      <LogoutButtonDiv>
        <LogoutButton onClick={() => navigate("/admin/login")}>
          Login
        </LogoutButton>
        <LogoutButton onClick={() => navigate("/admin/orders")}>
          Orders
        </LogoutButton>
        <LogoutButton onClick={() => navigate("/admin/products")}>
          Product
        </LogoutButton>
        <LogoutButton onClick={() => navigate("/admin/products/create")}>
          Create Product
        </LogoutButton>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </LogoutButtonDiv>
      <Outlet />
      <LoadingNotification />
    </Container>
  );
}

export default ProtectedAdminRoute;
