import { useQuery } from 'react-query';
import axiosInstance from '../lib/api';

export const useYearRange = () => {
  return useQuery({
    queryKey: ["temperature", "yearRange"],
    queryFn: async () => {
      const [populationResponse, globalTempResponse, temperatureResponse]
        = await Promise.all([
          axiosInstance.get("population/get-year-range"),
          axiosInstance.get("global-temperature/year-range"),
          axiosInstance.get("temperature/get-year-range")
        ])
      return {
        population: { ...populationResponse.data },
        global: { ...globalTempResponse.data },
        other: { ...temperatureResponse.data }
      };
    }
  })
}

