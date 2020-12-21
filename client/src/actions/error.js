export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

// export const receiveErrors = (message) => ({
//   type: RECEIVE_ERRORS,
//   message,
// });

export const receiveErrors = (message) => {
  return {
    type: RECEIVE_ERRORS,
    message,
  };
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
