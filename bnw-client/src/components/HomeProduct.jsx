import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import imgSrc from "../assets/imgSrc";
import { mobile, ipad, ipadAndMobile, computer } from "../responsive";

const Container = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  overflow: hidden;
  background-color: #f3f3f3;
  flex-direction: ${(props) => props.textRight && "row-reverse"};
  ${computer({ marginLeft: "20px", marginRight: "20px", height: "65vh" })}
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  height: 100%;
  position: relative;
  transition: 2s ease;
  left: ${(props) => props.left};
  transition: left ease 3s;
  @media (min-width: 1224px) {
    margin-left: ${(props) => !props.textRight && "10%"};
    margin-right: ${(props) => props.textRight && "10%"};
  }
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
  &:active {
    background-color: gray;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 50%;
  transition: 2s ease;
  position: relative;
  right: ${(props) => props.right};
  transition: right 3s ease;
  @media (min-width: 1224px) {
    margin-left: ${(props) => props.textRight && "10%"};
    margin-right: ${(props) => !props.textRight && "10%"};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductName = styled.h1`
  font-size: 2.5vw;
  ${ipad({ fontSize: "3.5vw" })};
  ${mobile({ fontSize: "4.5vw" })}
`;

const SecondHeader = styled.h2`
  text-align: center;
  font-size: 1.5vw;
  ${ipad({ fontSize: "2vw" })};
  ${mobile({ fontSize: "2.5vw" })}
`;
//this is product component that is found on the homepage
const HomeProduct = ({ textRight, src }) => {
  //each side of the component can be switched around.  Each side starts further to the right
  //and left and come into the center.  This will set the left css
  const reverseConst = textRight ? "200px" : "-200px";
  //we set a ref so that we can check the intersection observer
  const containerRef = useRef();
  const [leftSideLeft, setLeftSideLeft] = useState(reverseConst);
  const [rightSideRight, setRightSideRight] = useState(reverseConst);
  //this will be called within the intersection observer listener.
  const callbackFunction = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      //remove offset
      setLeftSideLeft(0);
      setRightSideRight(0);
    }
  };

  const options = { rootMargin: "0px", threshold: 0.5 };

  useEffect(() => {
    //sets a listener for when the viewport intersects a certain yoffset
    const observer = new IntersectionObserver(callbackFunction, options);
    containerRef.current && observer.observe(containerRef.current);
    return () => {
      //as we have set a listener we need to remove this listener to avoid this adding up continiously
      Container.current && observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return (
    <Container ref={containerRef} textRight={textRight}>
      <LeftSide left={leftSideLeft} textRight={textRight}>
        <ProductName>{src.name}</ProductName>
        <SecondHeader>{src.desc}</SecondHeader>
        <span>{src.attributes && src.attributes[0]}</span>
        <Link to={`/products/${src._id}`}>
          <LeftButton>View More</LeftButton>
        </Link>
      </LeftSide>
      <RightSide right={rightSideRight} textRight={textRight} img={src.image}>
        <ProductImage src={src.image} />
      </RightSide>
    </Container>
  );
};

export default HomeProduct;
