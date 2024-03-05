import { useQuery } from 'react-query';
import axiosInstance from '../lib/api';

export const useCountryTemperature = (countryId) => {
  return useQuery({
    queryKey: ["temperature", countryId],
    queryFn: async () => {
      return (await axiosInstance.get("temperature/region-temperature-list", {
        params: { countryId: countryId }
      })).data
    }
  })
}

export const useWorldTemperature = () => {
  return useQuery({
    queryKey: ["globalTemperature"],
    queryFn: async () => {
      return (await axiosInstance.get("global-temperature/get-all")).data
    }
  })
}

export const useCountryTemperatureDifference = (countryId, startYear, endYear) => {
  return useQuery({
    queryKey: ["temperature", countryId, startYear, endYear],
    queryFn: async () => {
      return (await axiosInstance.get("temperature/region-temperature/diff-by-years", {
        params: {
          countryId,
          startYear,
          endYear
        }
      })).data
    }
  })
}

export const useSimilarRegionByTemperature = (regionInformation) => {
  let newRegion;
  if (regionInformation.cityId !== 0) {
    let { stateId: _, ...cityInformation } = regionInformation;
    newRegion = cityInformation
  }
  else if (regionInformation.stateId !== 0) {
    let { cityId: _, ...stateInformation } = regionInformation;
    newRegion = stateInformation
  }
  else {
    let { cityId, stateId: _, ...countryInformation } = regionInformation;
    newRegion = countryInformation;
  }
  return useQuery({
    queryKey: ["similarRegion", regionInformation],
    queryFn: async () => {
      const res = (await axiosInstance.get("temperature/similar-region", {
        params: newRegion
      })).data
      return res;
    }
  })
}

export const useRegionAverageTemperatureInTimePeriod = (regionInformation) => {
  let newRegion;
  if (regionInformation.cityId !== 0) {
    let { limit, stateId: _, ...cityInformation } = regionInformation;
    newRegion = cityInformation
  }
  else if (regionInformation.stateId !== 0) {
    let { limit, cityId: _, ...stateInformation } = regionInformation;
    newRegion = stateInformation
  }
  else {
    let { limit, cityId, stateId: _, ...countryInformation } = regionInformation;
    newRegion = countryInformation;
  }
  return useQuery({
    queryKey: ["avgTemp", regionInformation],
    queryFn: async () => {
      const res = (await axiosInstance.get("temperature/region-average-temperature/by-time-period", {
        params: newRegion
      })).data

      return res;
    }
  })
}