import { configureStore } from "@reduxjs/toolkit";
import { overviewSlice } from './../slices/overviewSlice';

export const store = configureStore({
  reducer: {
    overview: overviewSlice.reducer,
  },
})