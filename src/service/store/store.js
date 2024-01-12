import { configureStore } from "@reduxjs/toolkit";
import { overviewSlice } from './../slices/overviewSlice';
import { detailSlice } from "../slices/detailviewSlice";

export const store = configureStore({
  reducer: {
    overview: overviewSlice.reducer,
    detail: detailSlice.reducer
  },
})