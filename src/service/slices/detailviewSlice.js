import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    currentRegionInforMation: {
      countryName: "",
      regionType: "",
      regionName: "",
      latitude: "",
      longtitude: "",
      temperatureList: [],
      populationList: [],
      cityList: [],
      stateList: []
    },
  },
  reducers: {
    setRegionInformation(state, action) {
      state.currentRegionInforMation = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getRegionTemperature.fulfilled, (state, action) => {
        state.currentRegionInforMation.temperatureList = action.payload;
      })
      .addCase(getRegionPopulation.fulfilled, (state, action) => {
        state.currentRegionInforMation.populationList = action.payload;
      })
      .addCase(getRegionsByCountry.fulfilled, (state, action) => {
        state.currentRegionInforMation.cityList = action.payload.cityList;
        state.currentRegionInforMation.stateList = action.payload.stateList;
      })
  }
})

export const getPopulationDifference = createAsyncThunk('detail/getPopulationDifference', async () => {

})

export const getTemperatureDifference = createAsyncThunk('detail/getTemperatureDifference', async () => {

})



export const getRegionTemperature = createAsyncThunk('detail/getRegionTemperature', async (region) => {
  const temperatureListResponse = region.countryName !== 'World' ? await
    axios({
      method: 'post',
      url: `http://localhost:8080/api/temp/by-region`,
      data: region,
      headers: { 'Content-Type': 'application/json' }
    })
    : await axios.get(`http://localhost:8080/api/global-temp/get-all`)
  return temperatureListResponse.data;
})

export const getRegionPopulation = createAsyncThunk('detail/getRegionPopulation', async (region) => {
  const populationListResponse = await
    axios.get(`http://localhost:8080/api/population/by-country?countryName=${region.countryName}`,)
  return populationListResponse.data;
})

export const getRegionsByCountry = createAsyncThunk('detail/getRegionsByCountry', async (countryName) => {
  const [
    cityListResponse,
    stateListResponse
  ] = await Promise.all([
    axios.get(`http://localhost:8080/api/city/by-country?countryName=${countryName}`),
    axios.get(`http://localhost:8080/api/state/by-country?countryName=${countryName}`),
  ]);
  return {
    cityList: cityListResponse.data,
    stateList: stateListResponse.data,
  };
})