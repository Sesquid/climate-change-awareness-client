import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const temperatureSlice = createSlice({
  name: 'temperature',
  initialState: {

  },
  reducers: {
    addTemperature(state, action) {
      const region = { ...action.payload.region }
      if (region.regionType === 'city') {
        state[region.regionName + ";"
          + region.latitude + ";"
          + region.longtitude] = action.payload.temperatureList;
      }
      else if (region.regionType === 'state') {
        state[region.regionName] = action.payload.temperatureList;
      }
      else {
        state[region.countryName] = action.payload.temperatureList;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getTemperatureListByCountryName.fulfilled, (state, action) => {
      state[action.payload.countryName] = action.payload.temperatureList;
    })
  }
})

export const getTemperatureListByCountryName = createAsyncThunk('temperature/getTemperatureListByCountryName', async (countryName) => {
  const temperatureListResponse = countryName !== 'World' ?
    await axios.get(`http://localhost:8080/api/temp/by-country?countryName=${countryName}`)
    : await axios.get(`http://localhost:8080/api/global-temp/get-all`)

  return {
    countryName: countryName,
    temperatureList: temperatureListResponse.data
  }
})