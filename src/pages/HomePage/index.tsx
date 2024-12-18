import React from "react";
import styled from "styled-components";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Content from "./Content";

import "./index.css";

const HomePage: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <Content />
      <Footer />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
