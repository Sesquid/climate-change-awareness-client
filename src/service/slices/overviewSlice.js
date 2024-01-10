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
      globalTemp: {
        start: 0,
        end: 0
      },
      otherTemp: {
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
    })
  }
})

export const getWorldPopulation = createAsyncThunk('overview/getWorldPopulation', async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:8080/api/population/world-population"
  })
  return response.data;
})

export const getAllCountriesPopulation = createAsyncThunk('overview/getAllCountriesPopulation', async () => {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:8080/api/population/all-countries-population/?year=2013'
  })
  return response.data;
})

export const getGlobalTempData = createAsyncThunk('overview/getGlobalTempData', async () => {
  const response = await axios({
    method: "get",
    
  })
})

export const getNumberOfRegions = createAsyncThunk('overview/getNumberOfRegions', async () => {
  const numberOfCitiesResponse = await axios({
    method: 'get',
    url: 'http://localhost:8080/api/city/number-of-cities'
  })
  const numberOfStatesResponse = await axios({
    method: 'get',
    url: 'http://localhost:8080/api/state/number-of-states'
  })
  const numberOfCountriesResponse = await axios({
    method: 'get',
    url: 'http://localhost:8080/api/country/number-of-countries'
  })
  return {
    cities: numberOfCitiesResponse.data,
    states: numberOfStatesResponse.data,
    countries: numberOfCountriesResponse.data
  }
})

export const getDataYearRange = createAsyncThunk('overview/getDataYearRange', async () => {
  const populationResponse = await axios({
    method: "get",
    url: "http://localhost:8080/api/population/year-range"
  })
  const globalTempResponse = await axios({
    method: "get",
    url: "http://localhost:8080/api/global-temp/year-range"
  })
  const otherTempResponse = await axios({
    method: "get",
    url: "http://localhost:8080/api/temp/year-range"
  })
  return {
    population: {
      start: populationResponse.data[0],
      end: populationResponse.data[1]
    },
    globalTemp: {
      start: globalTempResponse.data[0],
      end: globalTempResponse.data[1]
    },
    otherTemp: {
      start: otherTempResponse.data[0],
      end: otherTempResponse.data[1]
    }
  }
})