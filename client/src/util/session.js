import axios from "axios";

export const checkLoggedIn = async () => {
  const response = await axios.get("/api/auth/status");

  let preloadedState = {};
  if (response) {
    preloadedState = {
      session: response.data.user,
    };
  }
  return preloadedState;
};
