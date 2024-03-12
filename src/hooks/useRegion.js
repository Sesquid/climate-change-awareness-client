import { useQuery } from 'react-query';
import axiosInstance from '../lib/api';

export const useRegionNumber = () => {
  return useQuery({
    queryKey: ["country", "number"],
    queryFn: async () => {
      const [
        numberOfCitiesResponse,
        numberOfStatesResponse,
        numberOfCountriesResponse
      ] = await Promise.all([
        axiosInstance.get('city/number-of-cities'),
        axiosInstance.get('state/number-of-states'),
        axiosInstance.get('country/number-of-countries')
      ]);
      return {
        cities: numberOfCitiesResponse.data,
        states: numberOfStatesResponse.data,
        countries: numberOfCountriesResponse.data
      };
    }
  })
}

// filter = {
//   type: "name",
//   order: "asc"
// }

export const useCountry = (filter) => {
  return useQuery({
    queryKey: ["countries", filter],
    queryFn: async () => {
      return (await axiosInstance.get("country/get-all", {
        params: filter
      })).data
    }
  })
}

export const useCountryCity = (countryCode) => {
  return useQuery({
    queryKey: ["country", "city", countryCode],
    queryFn: async () => {
      return (await axiosInstance.get("city/by-country", {
        params: { countryCode: countryCode }
      })).data
    }
  })
}

export const useCountryState = (countryCode) => {
  return useQuery({
    queryKey: ["country", "state", countryCode],
    queryFn: async () => {
      return (await axiosInstance.get("state/by-country", {
        params: { countryCode: countryCode }
      })).data
    }
  })
}

// export const GetCityName = (cityId, countryCode) => {
//   const { data } = useCountryCity(countryCode);
//   if (!checkRegionNull(cityId)) {
//     return data.find(item => item.city === cityId)
//   }
//   return "--"
// }

// export const GetCountryName = (countryId) => {
//   const { data } = useCountry()
//   return data.find(item => item.country === countryId)
// }

// export const GetStateName = (stateId, countryCode) => {
//   const { data } = useCountryState(countryCode, stateId)
//   if (!checkRegionNull(stateId)) {
//     return data.find(item => item.state === stateId)
//   }
//   return "--"
// }