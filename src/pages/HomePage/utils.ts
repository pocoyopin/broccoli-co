import axios from "axios";

import { API_RESPONSE, FORM_ENDPOINT } from "./constants";

/** API */
/**
 * To send personal detail to request for invitation.
 * @param formValue - name and email in object format
 * @returns - whether or not invitation is requested successfully. will return the error message if failed
 */
export const submitInviteForm = async (formValue: {
  name: string;
  email: string;
}) => {
  try {
    const res = await axios.post(FORM_ENDPOINT, formValue, {
      validateStatus: (status) => !!(status === 200 || status === 400),
    });
    return {
      isSuccessful: res.data === API_RESPONSE.Success,
      errorMsg: res.data?.errorMessage || "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccessful: false,
      errorMsg: "Unable to request for an invite. Please try again later",
    };
  }
};
