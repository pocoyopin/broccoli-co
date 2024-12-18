import axios from "axios";
import { FORM_ENDPOINT, InputFieldName } from "./constants";

export const validateInviteForm = (field: InputFieldName, value: string) => {
  const errorMessages = {
    name: "",
    email: "",
    confirmEmail: "",
  };

  switch (field) {
    case "name":
      if (!value) {
        errorMessages.name = "Full name is required";
      } else {
        errorMessages.name = "";
      }
      break;

    case "email":
      if (!value) {
        errorMessages.email = "Email is required";
      } else {
        if (RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value)) {
          errorMessages.email = "Email format is invalid";
        } else {
          errorMessages.email = "";
        }

        if (
          errorMessages.confirmEmail &&
          errorMessages.confirmEmail !== value
        ) {
          errorMessages.confirmEmail =
            "Confirmation email does not match email";
        }
      }
      break;

    case "confirmEmail":
      if (!value) {
        errorMessages.confirmEmail = "Confirmation email is required";
      } else {
        if (errorMessages.email !== value) {
          errorMessages.confirmEmail =
            "Confirmation email does not match email";
        } else {
          errorMessages.confirmEmail = "";
        }
      }
      break;

    default:
      break;
  }

  return errorMessages;
};

/** API */
export const submitInviteForm = async (formValue: {
  name: string;
  email: string;
  confirmEmail: string;
}) => {
  try {
    const res = await axios.post(FORM_ENDPOINT, formValue, {
      validateStatus: (status) => !!(status === 200 || status === 400),
    });
    return { data: res.data, errorMsg: res.data?.errorMessage || "" };
  } catch (e) {
    console.error(e);
    return {
      data: "",
      errorMsg: "Unable to request for an invite. Please try again later",
    };
  }
};
