import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loader/loaderSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
  },
});
