import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/Auth";
const store = configureStore ({
    reducer:{
        auth : authSlice,
    },
    IdevTools:process.env.NODE_ENV !== "production"
})


export default store