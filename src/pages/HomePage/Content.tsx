import React, { useState } from "react";
import styled, { css } from "styled-components";

import Form from "./Form";
import Button from "../../components/Button";

const Content: React.FC = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleShowForm = () => {
    setShowInviteForm(true);
  };

  const handleHideForm = () => {
    setShowInviteForm(false);
  };

  return (
    <Container>
      <Header>A better way to enjoy every day.</Header>
      <Subheader>Be the first to know what we launch.</Subheader>
      <Button
        size="large"
        className="invite"
        onClick={handleShowForm}
        aria-label="Request an invite button"
        id="requestInvite"
      >
        Request an invite
      </Button>

      {showInviteForm && <Form onClose={handleHideForm} />}
    </Container>
  );
};

export default Content;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  max-width: 500px;
  text-align: center;
  margin: ${({ theme }) => theme.spacing.e}px;
  font-size: ${({ theme }) => theme.fontSizes.h3};
  ${({ theme }) => css`
    ${theme.mediaQueries.md} {
      font-size: ${({ theme }) => theme.fontSizes.h2};
    }
  `};
`;

const Subheader = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.h5};
  ${({ theme }) => css`
    ${theme.mediaQueries.md} {
      font-size: ${({ theme }) => theme.fontSizes.h4};
    }
  `};
  color: ${({ theme }) => theme.colors.black70};
`;
