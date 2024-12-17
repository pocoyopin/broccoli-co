import React from "react";
import LogoImg from "../assets/images/logo.png";
import styled from "styled-components";

const Navbar: React.FC = () => {
  return (
    <Container>
      <img src={LogoImg} alt="logo" width={30} height={30} />
      <Title>Broccoli & Co.</Title>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  minheight: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;
const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.subtext};
  margin-left: ${({ theme }) => theme.spacing.c}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
