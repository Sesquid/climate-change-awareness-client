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
    axios.get('http://localhost:8080/api/country/get-all/order-by-name?order=asc'),
    axios.get('http://localhost:8080/api/country/get-all/order-by-name?order=desc'),
    axios.get('http://localhost:8080/api/population/all-countries/order-by-population?order=asc'),
    axios.get('http://localhost:8080/api/population/all-countries/order-by-population?order=desc'),
    axios.get('http://localhost:8080/api/temp/all-countries/order-by-temperature?order=asc'),
    axios.get('http://localhost:8080/api/temp/all-countries/order-by-temperature?order=desc'),
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