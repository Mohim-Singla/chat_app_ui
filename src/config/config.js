
export const serviceConfig = {
  AUTH_SERVER: {
    HOST: process.env.REACT_APP_AUTH_SERVER_HOST,
    ENDPOINTS: {
      LOGIN: process.env.REACT_APP_AUTH_SERVER_LOGIN,
      SIGNUP: process.env.REACT_APP_AUTH_SERVER_SIGNUP,
      VALIDATE_TOKEN: process.env.REACT_APP_VALIDATE_TOKEN,
    },
  },
  CHAT_SERVER: {
    HOST: process.env.REACT_APP_CHAT_SERVER_HOST,
    ENDPOINTS: {
      FETCH_PUBLIC_GROUPS: process.env.REACT_APP_CHAT_SERVER_FETCH_PUBLIC_GROUPS
    },
  }
};
