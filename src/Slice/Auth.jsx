import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isloading: false,
  loggedIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "Login",
  initialState,

  reducers: {
    signUserStart: (state) => {
      state.isloading = true;
    },
    signUsersucces: (state, actions) => {
      state.isloading = false;
      state.loggedIn = true;
      state.user = actions.payload;
      state.error = null;
    },

    signUserErorr: (state, actions) => {
      state.isloading = false;
      state.error = actions.payload;
    },

    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem("token")
      toast.error("Siz Akkauntdan chiqib kettingiz ! Qaytish uchun Login qiling");
    },
  },
});

export const { signUserStart, signUsersucces, signUserErorr, logout } =
  authSlice.actions;
export default authSlice.reducer;
