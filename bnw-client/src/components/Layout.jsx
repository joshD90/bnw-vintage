import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  overflow-x: hidden;
`;
//this allows us to hold the navbar and footer irrespective of which page we are on.
//outlet represents the rest of the pages that we hold
function Layout() {
  return (
    <div>
      <Container>
        <Navbar />
        <Outlet />
        <Footer />
      </Container>
    </div>
  );
}

export default Layout;
