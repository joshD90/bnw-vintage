import { CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PointerContext } from "../context/pointerContext";

//this will display when there is some loading
const Container = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  width: 50px;
  height: 50px;
  top: calc(50vh - 25px);
  left: calc(50vw - 25px);
  z-index: 5;
  color: gray;
  font-size: 3rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 40px 30px white;
`;
//gives a spinner to show that there is loading particularly used for processes such as uploading to Firebase etc.
function LoadingNotification() {
  //visiibility of spinner will be based on pointer state so that all components can access it in the admin route
  const { pointerState } = useContext(PointerContext);

  return (
    <Container visible={pointerState}>
      <CircularProgress
        style={{
          color: "inherit",
          fontSize: "3rem",
          width: "100%",
          height: "100%",
        }}
      />
    </Container>
  );
}

export default LoadingNotification;
