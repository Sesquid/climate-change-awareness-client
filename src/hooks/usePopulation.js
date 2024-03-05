import { useQuery } from 'react-query';
import axiosInstance from '../lib/api';

export const useAllCountriesPopulation = (year) => {
  return useQuery({
    queryKey: ["population", "all-countries"],
    queryFn: async () => {
      return (await axiosInstance.get("population/all-countries-population", {
        params: {
          year: year
        }
      }
      )).data
    }
  })
}

export const useCountryPopulation = (countryCode) => {
  return useQuery({
    queryKey: ["population", countryCode],
    queryFn: async () => {
      return (await axiosInstance.get("population/by-country", {
        params: {
          countryCode: countryCode
        }
      })).data
    }
  })
}

export const usePopulationDifference = (countryCode, startYear, endYear) => {
  return useQuery({
    queryKey: ["population", countryCode, startYear, endYear],
    queryFn: async () => {
      return (await axiosInstance.get("population/diff-by-years", {
        params: {
          countryCode: countryCode,
          startYear: startYear,
          endYear: endYear
        }
      })).data
    }
  })
}