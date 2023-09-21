import axios from "axios";
import { SERVER_URL } from "./constants";

const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  await axios
    .post(`${SERVER_URL}/api/auth/login`, userCredentials)
    .then((response) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      // TODO: hide error data
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    });
};

export default loginCall;
