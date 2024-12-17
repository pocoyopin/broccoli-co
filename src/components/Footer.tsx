import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <Container>
      <Text>Made with &#x2661; in Singapore</Text>
      <Text>&#169; 2024 Broccoli & Co. All rights reserved.</Text>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.d}px;
  border-top: 1px solid ${({ theme }) => theme.colors.black};
`;

const Text = styled.p`
  margin: ${({ theme }) => theme.spacing.b}px;
`;
