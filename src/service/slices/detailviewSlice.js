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
    currentRegionInforMation:{
      region: "",
      temperatureList: [],
      populationList: []
    }
  },
  reducers:{
    setRegion(state, action){
      state.currentRegionInforMation.region = action.payload
    }
  },
  extraReducers:builder => {
    builder.addCase(getAllCountriesList.fulfilled, (state, action) => {
      state.countryList = action.payload;
    })
    .addCase(getRegionTemperatureAndPopulation.fulfilled, (state, action) => {
      console.log(action.payload)
      state.currentRegionInforMation.temperatureList = action.payload.currentRegionInforMation.temperatureList;
      state.currentRegionInforMation.populationList = action.payload.currentRegionInforMation.populationList;
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

export const getRegionTemperatureAndPopulation = createAsyncThunk('detail/getRegionTemperatureAndPopulation', async (region) => {
  const [
    temperatureList,
    populationList
  ] = region !== 'World' ? await Promise.all([
    axios.get(`http://localhost:8080/api/temp/by-country?countryName=${region}`),
    axios.get(`http://localhost:8080/api/population/by-country?countryName=${region}`),
  ]): await Promise.all([
    axios.get(`http://localhost:8080/api/global-temp/get-all`),
    axios.get(`http://localhost:8080/api/population/world-population`),
  ]);


  return {
    currentRegionInforMation:{
      temperatureList: temperatureList.data,
      populationList: populationList.data
    }
  };
})