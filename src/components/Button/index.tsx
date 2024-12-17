import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import "./index.css";

type Props = {
  size: "small" | "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = (props: Props) => {
  switch (props.size) {
    case "small":
      return <ButtonSmall {...props}>{props.children}</ButtonSmall>;
    case "large":
      return <ButtonLarge {...props}>{props.children}</ButtonLarge>;
  }
  return <button {...props}>{props.children}</button>;
};

export default Button;

const ButtonSmall = styled.button`
  padding: 0.6rem;
  font-size: ${({ theme }) => theme.fontSizes.subtext};
  font-weight: ${({ theme }) => theme.fontWeights.lightBold};
  height: 40px;
`;

const ButtonLarge = styled.button`
  padding: 1rem 1.75rem;
  font-size: ${({ theme }) => theme.fontSizes.paragraph};
  font-weight: ${({ theme }) => theme.fontWeights.lightBold};
  ${({ theme }) => css`
    ${theme.mediaQueries.md} {
      padding: 1.5rem 2.5rem;
      font-size: ${({ theme }) => theme.fontSizes.h5};
    }
  `};
`;
