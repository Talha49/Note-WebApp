import { configureStore } from "@reduxjs/toolkit";
import userDataslice from "../features/userDataslice";

export const store = configureStore({
    reducer: {
        app: userDataslice
    }
});