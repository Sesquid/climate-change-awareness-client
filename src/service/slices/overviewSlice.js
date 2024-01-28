import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const overviewSlice = createSlice({
  name: "overview",
  initialState: {
    worldPopulation: [],
    worldTemperature: [],
    allCountriesPopulation: [],
    numberOfRegions: {
      cities: 0,
      states: 0,
      countries: 0
    },
    dataYearRange: {
      population: {
        start: 0,
        end: 0
      },
      global: {
        start: 0,
        end: 0
      },
      other: {
        start: 0,
        end: 0
      }
    }

  },
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getWorldPopulation.fulfilled, (state, action) => {
      state.worldPopulation = action.payload
    }).addCase(getAllCountriesPopulation.fulfilled, (state, action) => {
      state.allCountriesPopulation = action.payload
    }).addCase(getNumberOfRegions.fulfilled, (state, action) => {
      state.numberOfRegions = action.payload;
    }).addCase(getDataYearRange.fulfilled, (state, action) => {
      state.dataYearRange = action.payload
    }).addCase(getGlobalTempData.fulfilled, (state, action) => {
      state.worldTemperature = action.payload
    })
  }
})

export const getWorldPopulation = createAsyncThunk('overview/getWorldPopulation', async () => {
  const response = await axios({
    method: "get",
    url: "https://climate-change-awareness-production.up.railway.app/api/population/world-population"
  })
  return response.data;
})

export const getAllCountriesPopulation = createAsyncThunk('overview/getAllCountriesPopulation', async () => {
  const response = await axios({
    method: 'get',
    url: 'https://climate-change-awareness-production.up.railway.app/api/population/all-countries-population/?year=2013'
  })
  return response.data;
})

export const getGlobalTempData = createAsyncThunk('overview/getGlobalTempData', async () => {
  const response = await axios({
    method: "get",
    url: "https://climate-change-awareness-production.up.railway.app/api/global-temp/get-all"
  })
  return response.data;
})

export const getNumberOfRegions = createAsyncThunk('overview/getNumberOfRegions', async () => {
  const [
    numberOfCitiesResponse,
    numberOfStatesResponse,
    numberOfCountriesResponse
  ] = await Promise.all([
    axios.get('https://climate-change-awareness-production.up.railway.app/api/city/number-of-cities'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/state/number-of-states'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/country/number-of-countries')
  ]);
  return {
    cities: numberOfCitiesResponse.data,
    states: numberOfStatesResponse.data,
    countries: numberOfCountriesResponse.data
  };
})

export const getDataYearRange = createAsyncThunk('overview/getDataYearRange', async () => {
  const [
    populationResponse,
    globalTempResponse,
    otherTempResponse
  ] = await Promise.all([
    axios.get('https://climate-change-awareness-production.up.railway.app/api/population/year-range'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/global-temp/year-range'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/temp/year-range')
  ]);

  return {
    population: { ...populationResponse.data },
    global: { ...globalTempResponse.data },
    other: { ...otherTempResponse.data }
  };
})