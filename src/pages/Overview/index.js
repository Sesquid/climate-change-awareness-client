import React, { useEffect } from 'react'
import style from "./style.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountriesPopulation, getDataYearRange, getGlobalTempData, getNumberOfRegions, getWorldPopulation } from '../../service/slices/overviewSlice';
import { allCountriesPopulationSelector, dataYearRangeSelector, numberOfRegionsSelector, worldPopulationSelector, worldTemperatureSelector } from './../../service/selector/selector';
import CustomChart from '../../component/Chart';
const Overview = () => {


  const dispatch = useDispatch();
  const numberOfRegions = useSelector(numberOfRegionsSelector);
  const worldPopulation = useSelector(worldPopulationSelector);
  const allCountriesPopulation = useSelector(allCountriesPopulationSelector);
  const dataYearRange = useSelector(dataYearRangeSelector);
  const worldTemperature = useSelector(worldTemperatureSelector);

  useEffect(() => {
    dispatch(getWorldPopulation());
    dispatch(getAllCountriesPopulation());
    dispatch(getNumberOfRegions());
    dispatch(getDataYearRange());
    dispatch(getGlobalTempData())
  }, [])

  const chartOptions = {
    worldPopulation: {
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
  }

  return (
    <div>
      <div className={style.overview_title}>
        <div>Climate Change</div>
      </div>
      <div className={style.overview_body}>
        <div className={`col-3`}></div>
        {Object.entries(numberOfRegions).map(([key, value]) => {
          return (
            <div className={`col-2 ${style.number_of_regions_cell}`}>
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
        {Object.entries(dataYearRange).map(([key, value]) => {
          return (
            <div className={`col-2 ${style.year_range_cell}`}>
              {key.toUpperCase()} {key !== "population" ? "TEMPERATURE DATA" : "DATA"}
              <br></br>
              {value.startYear} - {value.endYear}
            </div>
          )
        })}
        <div className={`col-3`}></div>
      </div>
      {Object.entries(chartOptions).map(([key, value]) =>
        <CustomChart options={value}></CustomChart>
      )}
    </div>

  )
}

export default Overview;

