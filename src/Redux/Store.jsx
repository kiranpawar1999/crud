import { configureStore } from "@reduxjs/toolkit";
import  CurdSlice  from "./Slices/CurdSlice";
import UserSlice from "./Slices/UserSlice";

const Store = configureStore({
    reducer:{
        allCurd: CurdSlice,
         userAuth: UserSlice
    }
});

export default Store;