import { configureStore } from "@reduxjs/toolkit";
import { overviewSlice } from './../slices/overviewSlice';
import { detailSlice } from "../slices/detailviewSlice";
import { countryListSlice } from "../slices/countryListSlice";
import { temperatureSlice } from "../slices/temperatureSlice";
import { populationSlice } from "../slices/populationSlice";
import { locationSlice } from "../slices/locationSlice";

export const store = configureStore({
  reducer: {
    overview: overviewSlice.reducer,
    detail: detailSlice.reducer,
    countryList: countryListSlice.reducer,
    temperatureList: temperatureSlice.reducer,
    populationList: populationSlice.reducer,
    locationList: locationSlice.reducer
  },
})