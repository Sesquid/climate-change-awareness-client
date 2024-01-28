import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { performance } = window
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
      stateList: [],
      startTime: ""
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
        state.currentRegionInforMation.temperatureList = action.payload.temperatureList;
        console.log('setDataToStore ' + Date.now() - action.payload.startTime  + 'ms')

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



export const getRegionTemperature = createAsyncThunk('detail/getRegionTemperature', async (payload) => {
  const { region, startTime } = payload
  const temperatureListResponse = region.countryName !== 'World' ? await
    axios({
      method: 'post',
      url: `https://climate-change-awareness-production.up.railway.app/api/temp/by-region`,
      data: region,
      headers: { 'Content-Type': 'application/json' }
    })
    : await axios.get(`https://climate-change-awareness-production.up.railway.app/api/global-temp/get-all`)
  return {
    temperatureList: temperatureListResponse.data,
    startTime: startTime
  };
})

export const getRegionPopulation = createAsyncThunk('detail/getRegionPopulation', async (region) => {
  const populationListResponse = await
    axios.get(`https://climate-change-awareness-production.up.railway.app/api/population/by-country?countryName=${region.countryName}`,)
  return populationListResponse.data;
})

export const getRegionsByCountry = createAsyncThunk('detail/getRegionsByCountry', async (countryName) => {
  const [
    cityListResponse,
    stateListResponse
  ] = await Promise.all([
    axios.get(`https://climate-change-awareness-production.up.railway.app/api/city/by-country?countryName=${countryName}`),
    axios.get(`https://climate-change-awareness-production.up.railway.app/api/state/by-country?countryName=${countryName}`),
  ]);
  return {
    cityList: cityListResponse.data,
    stateList: stateListResponse.data
  };
})