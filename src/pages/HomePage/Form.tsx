import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import Button from "../../components/Button";

import useFormValidation from "./hooks/useFormValidation";
import { submitInviteForm } from "./utils";

import theme from "../../theme";
import LoadingIcon from "../../assets/images/loading.gif";
import { InputFieldName } from "./types";

type Props = {
  onClose: () => void;
};

const Form: React.FC<Props> = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    confirmEmail: "",
  });
  const firstUpdate = useRef(true);

  const errorMessage = useFormValidation(
    formValue,
    isSubmitting,
    firstUpdate.current
  );
  const [apiResponse, setApiResponse] = useState({
    isSuccessful: false,
    errorMsg: "",
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setApiResponse({ isSuccessful: false, errorMsg: "" });
  };

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  });

  useEffect(() => {
    const submitForm = async () => {
      if (isSubmitting && Object.values(errorMessage).every((item) => !item))
        try {
          const { confirmEmail, ...rest } = formValue;
          const res = await submitInviteForm(rest);
          setApiResponse(res);
        } catch (e) {
          console.error({ e });
        }
      setIsSubmitting(false);
    };

    submitForm();
  }, [errorMessage]);

  const handleInputChange = (field: InputFieldName, value: string) => {
    setFormValue({ ...formValue, [field]: value });
  };

  return (
    <Overlay>
      <FormContainer>
        {apiResponse.isSuccessful ? (
          <ModalContainer>
            <FormContentContainer>
              <FormTitle>All done!</FormTitle>
              <FormSubtitle>
                You will be one of the first to experience Broccoli & Co. when
                we launch
              </FormSubtitle>
              <Button
                aria-label="Ok button"
                onClick={props.onClose}
                size="small"
                id="closeModalButton"
              >
                Ok
              </Button>
            </FormContentContainer>
          </ModalContainer>
        ) : (
          <FormContent name="invite-form" title="Request an Invite">
            <FormContentContainer>
              <Button
                type="button"
                size="small"
                style={{
                  border: "none",
                  alignSelf: "flex-end",
                  position: "absolute",
                  padding: 0,
                  height: theme.spacing.d,
                }}
                onClick={props.onClose}
                aria-label="Close form button"
                id="inviteFormCloseButton"
              >
                &#x2715;
              </Button>
              <FormTitle>Request an Invite</FormTitle>

              <Input
                placeholder="Full name"
                aria-required
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <ErrorContainer>
                <ErrorText>{errorMessage.name}</ErrorText>
              </ErrorContainer>

              <Input
                placeholder="Email"
                aria-required
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <ErrorContainer>
                <ErrorText>{errorMessage.email}</ErrorText>
              </ErrorContainer>

              <Input
                placeholder="Confirm email"
                aria-required
                onChange={(e) =>
                  handleInputChange("confirmEmail", e.target.value)
                }
              />
              <ErrorContainer>
                <ErrorText>{errorMessage.confirmEmail}</ErrorText>
              </ErrorContainer>

              <Button
                aria-label="Send invite button"
                id="submitInviteButton"
                type="button"
                onClick={handleSubmit}
                className={isSubmitting ? "disabled" : undefined}
                disabled={isSubmitting}
                size="small"
              >
                {isSubmitting ? (
                  <img
                    src={LoadingIcon}
                    alt="Loading icon"
                    height={20}
                    width={20}
                  />
                ) : (
                  "Send"
                )}
              </Button>
              <ErrorText>{apiResponse.errorMsg}</ErrorText>
            </FormContentContainer>
          </FormContent>
        )}
      </FormContainer>
    </Overlay>
  );
};

export default Form;

const Overlay = styled.div`
  inset: 0px;
  position: fixed;
  height: auto;
  width: auto;
  border: 1px solid #333;
  background-color: ${({ theme }) => theme.colors.black50};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.black};
  position: relative;
  z-index: 100;
`;

const FormContent = styled.form`
  width: 300px;
  ${({ theme }) => css`
    ${theme.mediaQueries.md} {
      width: 400px;
    }
  `};
`;

const ModalContainer = styled.div`
  width: 300px;
  ${({ theme }) => css`
    ${theme.mediaQueries.md} {
      width: 400px;
    }
  `};
`;

const FormContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const FormTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h6};
  ${({ theme }) => css`
    ${theme.mediaQueries.md} {
      font-size: ${({ theme }) => theme.fontSizes.h5};
    }
  `};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.e}px;
`;

const FormSubtitle = styled.p`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.e}px;
  margin-top: ${({ theme }) => theme.spacing.a}px;
`;

const Input = styled.input`
  height: 40px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  ${({ theme }) => css`
    ${theme.mediaQueries.md} {
      font-size: ${({ theme }) => theme.fontSizes.subtext};
    }
  `};
  font-weight: ${({ theme }) => theme.fontWeights.lightBold};
  padding: 0 1rem;
`;

const ErrorContainer = styled.div`
  height: 40px;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin: 5px 0px;
`;
