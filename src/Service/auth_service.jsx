import axios from "./api";

const Auth_Service = {
  userRegister: async (user) => {
    const response = await axios.post("auth/register", user);
    return response;
  },

  userLogin: async (user) => {
    const response = await axios.post("auth/login", user);
    return response;
  },

  getUser: async (token) => {
    const responce = await axios.get("auth/me", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return responce;
  },
};

export default Auth_Service;
