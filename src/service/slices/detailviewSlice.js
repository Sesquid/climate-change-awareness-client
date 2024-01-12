import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    countryList:{
      orderByName:{
        asc: [],
        desc: []
      },
      orderByPopulation:{
        asc: [],
        desc: []
      },
      orderByTemperature: {
        asc: [],
        desc: []
      }
    },
  },
  reducers:{
  },
  extraReducers:builder => {
    builder.addCase(getAllCountriesList.fulfilled, (state, action) => {
      console.log(action.payload)
      state.countryList = action.payload;
    })
  }
})

export const getAllCountriesList = createAsyncThunk('detail/getAllCountriesList', async () => {
  const [
    countryListOrderByNameAsc,
    countryListOrderByNameDesc,
    countryListOrderByPopulationAsc,
    countryListOrderByPopulationDesc,
    countryListOrderByTemperatureAsc,
    countryListOrderByTemperatureDesc,
  ] = await Promise.all([
    axios.get('http://localhost:8080/api/country/get-all/order-by-name/asc'),
    axios.get('http://localhost:8080/api/country/get-all/order-by-name/desc'),
    axios.get('http://localhost:8080/api/population/all-countries/order-by-population/asc'),
    axios.get('http://localhost:8080/api/population/all-countries/order-by-population/desc'),
    axios.get('http://localhost:8080/api/temp/all-countries/order-by-temperature/asc'),
    axios.get('http://localhost:8080/api/temp/all-countries/order-by-temperature/desc'),
  ]);


  return {
    orderByName:{
      asc: [...countryListOrderByNameAsc.data],
      desc: [...countryListOrderByNameDesc.data]
    },
    orderByPopulation:{
      asc: [...countryListOrderByPopulationAsc.data],
      desc: [...countryListOrderByPopulationDesc.data]
    },
    orderByTemperature: {
      asc: [...countryListOrderByTemperatureAsc.data],
      desc: [...countryListOrderByTemperatureDesc.data]
    }
  };
})