import axios from "axios";
import { FORM_ENDPOINT } from "./constants";

export const validateInviteForm = () => {
  // TODO: form validation goes here
  return {
    name: "",
    email: "",
    confirmEmail: "",
  };
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
