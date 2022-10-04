import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import imgSrc from "../assets/imgSrc";

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  overflow: hidden;
  background-color: #e2e0e0;
  flex-direction: ${(props) => props.textRight && "row-reverse"};
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  margin-left: ${(props) => !props.textRight && "10%"};
  margin-right: ${(props) => props.textRight && "10%"};
  height: 100%;
  position: relative;
  transition: 2s ease;
  left: ${(props) => props.left};
  transition: left ease 3s;
`;

const LeftButton = styled.button`
  border-style: solid;
  border-width: 2px;
  border-color: black;
  background-color: white;
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-image: url(https://assets.bigcartel.com/assets/14178/1977-FAI-Cup-Tommy-McConville.jpg?w=2400&h=2400);
  background-repeat: none;
  background-size: cover;
  height: 100%;
  width: 50%;
  margin-left: ${(props) => props.textRight && "10%"};
  margin-right: ${(props) => !props.textRight && "10%"};
  transition: 2s ease;
  position: relative;
  right: ${(props) => props.right};
  transition: right 3s ease;
`;

const SecondHeader = styled.h2`
  border: solid 1px red;
`;

const HomeProduct = ({ textRight }) => {
  const reverseConst = textRight ? "200px" : "-200px";

  const containerRef = useRef();
  const [leftSideLeft, setLeftSideLeft] = useState(reverseConst);
  const [rightSideRight, setRightSideRight] = useState(reverseConst);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setLeftSideLeft(0);
      setRightSideRight(0);
    }
  };

  const options = { rootMargin: "0px", threshold: 0.5 };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    containerRef.current && observer.observe(containerRef.current);
    return () => {
      Container.current && observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return (
    <Container ref={containerRef} textRight={textRight}>
      <LeftSide left={leftSideLeft} textRight={textRight}>
        <h1>My Left Side Header</h1>
        <SecondHeader>I am a smaller Header </SecondHeader>
        <span>Purchase Now</span>
        <span>Purchase then</span>
        <LeftButton>View More</LeftButton>
      </LeftSide>
      <RightSide right={rightSideRight} textRight={textRight}></RightSide>
    </Container>
  );
};

export default HomeProduct;
