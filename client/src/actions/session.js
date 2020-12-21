import { receiveErrors } from "./error";
import axios from "axios";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user,
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const login = (user) => async (dispatch) => {
  const response = await axios
    .post("/api/auth/login", user)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return dispatch(receiveErrors("Invalid Credentials"));
      }
    });

  if (response.data.success) {
    return dispatch(receiveCurrentUser(response.data.data));
  } else {
    // todo: handle errors

    return dispatch(receiveErrors("Invalid Credentials"));
  }
};

export const signup = (user) => async (dispatch) => {
  const response = await axios
    .post("/api/auth/register", user)
    .catch(function (error) {
      if (error) {
        return error;
      }
    });

  if (response.data.success) {
    return dispatch(receiveCurrentUser(response.data.data));
  } else {
    // todo: handle errors
    return dispatch(receiveErrors("Error registering account..."));
  }
};

export const logout = () => async (dispatch) => {
  const response = await axios.delete("/api/auth/logout");

  if (response.data.success) {
    return dispatch(logoutCurrentUser());
  } else {
    dispatch(receiveErrors(response.data));
  }
};
