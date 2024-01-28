import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const populationSlice = createSlice({
  name: 'population',
  initialState: {
  },
  reducers: {
    addCountry(state, action) {
      state[action.payload.countryName] = action.payload.populationList;
    }
  },
  // extraReducers: builder => {
  //   builder.addCase(getRegionPopulation.fulfilled, (state, action) => {
  //     state[action.payload.region.countryName] = action.payload.populationList
  //   })
  // }
})

// export const getRegionPopulation = createAsyncThunk('population/getRegionPopulation', async (region) => {
//   const populationListResponse = await
//     axios.get(`https://climate-change-awareness-production.up.railway.app/api/population/by-country?countryName=${region.countryName}`,)
//   return {
//     region: region,
//     populationList: populationListResponse.data
//   };
// })