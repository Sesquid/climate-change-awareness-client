
import style from "./style.module.css"
import CustomChart from '../../components/Chart';
import Loading from "../../components/Loading";
import { useRegionNumber } from "../../hooks/useRegion";
import { useYearRange } from "../../hooks/useYearRange";
import { useAllCountriesPopulation, useCountryPopulation } from "../../hooks/usePopulation";
import { useWorldTemperature } from "../../hooks/useTemperature";
import { useEffect, useState } from "react";
const Overview = () => {

  const { data: numberOfRegions, isLoading: isNumberOfRegionsLoading } = useRegionNumber();
  const { data: dataYearRange, isLoading: isYearRangeLoading } = useYearRange();
  const { data: worldPopulation, isLoading: isWorldPopulationLoading } = useCountryPopulation("WLD");
  const { data: worldTemperature, isLoading: isWorldTemperatureLoading } = useWorldTemperature();
  const { data: allCountriesPopulation, isLoading: isAllCountriesPopulationLoading } = useAllCountriesPopulation(2013);
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    if (worldPopulation, worldTemperature, allCountriesPopulation)
      setChartOptions({
        worldPopulation: {
          accessibility: {
            enabled: false
          },
          chart: {
            type: 'column'
          },
          title: {
            text: 'Global Population',
            style: {
              fontSize: '40px'
            }
          },
          xAxis: {
            type: "category",
            categories: worldPopulation.map((item) => item.year)
          },
          yAxis: [
            {
              name: "Population",
              opposite: false,
              min: 0,
              max: 7500000000
            }
          ],
          series: [
            {
              color: "rgb(255, 218, 149)",
              name: 'Population',
              data: worldPopulation.map(item => item.population),
            }
          ]
        },
        worldTemperature: {
          accessibility: {
            enabled: false
          },
          chart: {
            type: 'column'
          },
          title: {
            text: 'Global Average Temperature',
            style: {
              fontSize: '40px'
            }
          },
          xAxis: {
            type: "category",
            categories: worldTemperature.filter(item => item.year % 2 === 1).map(item => item.year)
          },
          yAxis: [
            {
              name: "Temperature",
              opposite: false,
              min: 0,
              max: 10
            }
          ],
          series: [
            {
              color: "rgb(255, 218, 149)",
              name: 'Temperature',
              data: worldTemperature.filter(item => item.year % 2 === 1).map(item => item.avgTemp),
            }
          ]
        },
        allCountriesPopulation: {
          accessibility: {
            enabled: false
          },
          chart: {
            height: 1200,
            type: 'bar'
          },
          title: {
            text: 'World Population Rank in 2013',
            style: {
              fontSize: '40px'
            }
          },
          xAxis: {
            categories: allCountriesPopulation.map(item => item.countryName),
            gridLineWidth: 1,
            lineWidth: 0
          },
          yAxis: {
            name: "Population",
            opposite: false,
            min: 0,
            max: 1800000000,
            title: {
              text: 'Population (millions)',
              align: 'high'
            },
            labels: {
              overflow: 'justify'
            },
          },
          series: [
            {
              color: "rgb(255, 218, 149)",
              name: 'Population',
              data: allCountriesPopulation.map(item => item.population),
              pointWidth: 10,
            }
          ]
        }
      })
  }, [worldPopulation, worldTemperature, allCountriesPopulation])

  if (isNumberOfRegionsLoading || isYearRangeLoading || isWorldPopulationLoading
    || isWorldTemperatureLoading || isAllCountriesPopulationLoading) {
    return <Loading></Loading>
  }
  return (
    <div>
      <div className={style.overview_title}>
        <div>Climate Change Awareness</div>
      </div>
      <div className={style.overview_body}>
        <div className={`col-3`}></div>
        {Object.entries(numberOfRegions ?? {}).map(([key, value]) => {
          return (
            <div key={key} className={`col-2 ${style.number_of_regions_cell}`}>
              NUMBER OF {key.toUpperCase()}
              <br></br>
              {value}
            </div>
          )
        })}
        <div className={`col-3`}></div>
      </div>

      <div className={style.overview_body}>
        <div className={`col-3`}></div>
        {Object.entries(dataYearRange ?? {}).map(([key, value]) => {
          return (
            <div key={key} className={`col-2 ${style.year_range_cell}`}>
              {key.toUpperCase()} {key !== "population" ? "TEMPERATURE DATA" : "DATA"}
              <br></br>
              {value.startYear} - {value.endYear}
            </div>
          )
        })}
        <div className={`col-3`}></div>
      </div>
      {Object.entries(chartOptions).map(([key, value]) =>
        <CustomChart key={key} options={value}></CustomChart>
      )}
    </div>

  )
}

export default Overview;

