import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const locationSlice = createSlice({
  name: 'location',
  initialState: {

  },
  reducers: {
    addCountryRegions(state, action) {
      state[action.payload.countryName] = {
        cityList: action.payload.cityList,
        stateList: action.payload.stateList
      }
    }
  }
})

