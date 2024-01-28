import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const countryListSlice = createSlice({
  name: "countryList",
  initialState: {
    orderByName: {
      asc: [],
      desc: []
    },
    orderByPopulation: {
      asc: [],
      desc: []
    },
    orderByTemperature: {
      asc: [],
      desc: []
    },
  },
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getAllCountriesList.fulfilled, (state, action) => {
      state.orderByName = action.payload.orderByName;
      state.orderByPopulation = action.payload.orderByPopulation;
      state.orderByTemperature = action.payload.orderByTemperature;
    })

  }
})



export const getAllCountriesList = createAsyncThunk('countryList/getAllCountriesList', async () => {
  const [
    countryListOrderByNameAsc,
    countryListOrderByNameDesc,
    countryListOrderByPopulationAsc,
    countryListOrderByPopulationDesc,
    countryListOrderByTemperatureAsc,
    countryListOrderByTemperatureDesc,
  ] = await Promise.all([
    axios.get('https://climate-change-awareness-production.up.railway.app/api/country/get-all/order-by-name?order=asc'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/country/get-all/order-by-name?order=desc'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/population/all-countries/order-by-population?order=asc'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/population/all-countries/order-by-population?order=desc'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/temp/all-countries/order-by-temperature?order=asc'),
    axios.get('https://climate-change-awareness-production.up.railway.app/api/temp/all-countries/order-by-temperature?order=desc'),
  ]);


  return {
    orderByName: {
      asc: countryListOrderByNameAsc.data,
      desc: countryListOrderByNameDesc.data
    },
    orderByPopulation: {
      asc: countryListOrderByPopulationAsc.data,
      desc: countryListOrderByPopulationDesc.data
    },
    orderByTemperature: {
      asc: countryListOrderByTemperatureAsc.data,
      desc: countryListOrderByTemperatureDesc.data
    }
  };
})