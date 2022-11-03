import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: blue;
`;

function IntersectionTest() {
  const containerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    console.log(entry.isIntersecting, "in the callback");
  };

  const options = { rootMargin: "0px", threshold: 1.0 };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    containerRef.current && observer.observe(containerRef.current);
    return containerRef.current && observer.observe(containerRef.current);
  }, [containerRef, options]);

  return (
    <Container ref={containerRef}>
      <h1>Intersection Text</h1>
      <span>Happy Flipping days</span>
    </Container>
  );
}

export default IntersectionTest;
