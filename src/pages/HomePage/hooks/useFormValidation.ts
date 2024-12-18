import { useEffect, useState } from "react";

import { InputFieldName } from "../../../types";

const useFormValidation = (
  formValue: Record<InputFieldName, string>,
  isSubmitting: boolean,
  isFirstRender: boolean
) => {
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    confirmEmail: "",
  });

  const validateAllFields = () => {
    const allErrorMsg = { ...errorMessage };
    for (const fieldName of Object.keys(formValue) as InputFieldName[]) {
      const errMsg = validateFields(fieldName);
      if (errMsg.name) {
        allErrorMsg.name = errMsg.name;
      }
      if (errMsg.email) {
        allErrorMsg.email = errMsg.email;
      }
      if (errMsg.confirmEmail) {
        allErrorMsg.confirmEmail = errMsg.confirmEmail;
      }
    }
    setErrorMessage(allErrorMsg);
  };

  const validateFields = (field: InputFieldName) => {
    const allErrorMsg = { ...errorMessage };

    switch (field) {
      case "name":
        if (!formValue["name"]) {
          allErrorMsg.name = "Full name is required";
        } else {
          if (formValue["name"].length < 3) {
            allErrorMsg.name = "Full name is should have minimal 3 characters";
          } else {
            allErrorMsg.name = "";
          }
        }
        break;

      case "email":
        if (!formValue["email"]) {
          allErrorMsg.email = "Email is required";
        } else {
          if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formValue["email"])) {
            allErrorMsg.email = "Email format is invalid";
          } else {
            allErrorMsg.email = "";
          }
          if (
            formValue.confirmEmail &&
            formValue.confirmEmail !== formValue["email"]
          ) {
            allErrorMsg.confirmEmail =
              "Confirmation email does not match email";
          }
        }
        break;

      case "confirmEmail":
        if (!formValue["confirmEmail"]) {
          allErrorMsg.confirmEmail = "Confirmation email is required";
        } else {
          if (formValue.email !== formValue["confirmEmail"]) {
            allErrorMsg.confirmEmail =
              "Confirmation email does not match email";
          } else {
            allErrorMsg.confirmEmail = "";
          }
        }
        break;

      default:
        break;
    }

    return allErrorMsg;
  };

  useEffect(() => {
    if (!isFirstRender) {
      const err = validateFields("name");
      setErrorMessage(err);
    }
  }, [formValue.name]);

  useEffect(() => {
    if (!isFirstRender) {
      const err = validateFields("email");
      setErrorMessage(err);
    }
  }, [formValue.email]);

  useEffect(() => {
    if (!isFirstRender) {
      const err = validateFields("confirmEmail");
      setErrorMessage(err);
    }
  }, [formValue.confirmEmail]);

  useEffect(() => {
    if (isSubmitting) {
      validateAllFields();
    }
  }, [isSubmitting]);

  return errorMessage;
};

export default useFormValidation;
