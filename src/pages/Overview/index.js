import React, { useEffect, useState } from 'react'
import style from "./style.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountriesPopulation, getDataYearRange, getNumberOfRegions, getWorldPopulation } from '../../service/slices/overviewSlice';
import { allCountriesPopulationSelector, dataYearRangeSelector, numberOfRegionsSelector, worldPopulationSelector } from './../../service/selector/selector';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
const Overview = () => {


  const dispatch = useDispatch();
  const numberOfRegions = useSelector(numberOfRegionsSelector);
  const worldPopulation = useSelector(worldPopulationSelector);
  const allCountriesPopulation = useSelector(allCountriesPopulationSelector);
  const dataYearRange = useSelector(dataYearRangeSelector);
  useEffect(() => {
    dispatch(getWorldPopulation());
    dispatch(getAllCountriesPopulation());
    dispatch(getNumberOfRegions());
    dispatch(getDataYearRange());
  }, [])

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Global Population'
    },
    xAxis: {
      type: "category",
      categories: Array.from({ length: Math.floor((dataYearRange.population.end - dataYearRange.population.start + 2)) })
        .map((_, index) => dataYearRange.population.start + index),
    },
    yAxis: [

      {
        name: "Population",
        opposite: false,
        min: 0,
        max: 8000000000
      }
    ],
    series: [
      {
        name: 'Population',
        data: worldPopulation.map(item => {
          console.log(item.population)
          return item.population
        }),

      }
    ]
  };

  return (
    <div>
      <div className={style.overview_title}>
        <div>Climate Change</div>
      </div>
      <div className={style.overview_body}>
        <div className={`col-4`}></div>
        <div className={`col-1 ${style.amount_infor_cell}`}>
          Number of states
          <br></br>
          {numberOfRegions.states}
        </div>
        <div className={`col-1 ${style.amount_infor_cell}`}>
          Number of cities
          <br></br>
          {numberOfRegions.cities}
        </div>
        <div className={`col-1 ${style.amount_infor_cell}`}>
          Number of countries
          <br></br>
          {numberOfRegions.countries}
        </div>
        <div className={`col-4`}></div>
      </div>

      <div className={style.overview_body}>
        <div className={`col-3`}></div>
        <div className={`col-2 ${style.year_range_cell}`}>
          Population Data
          <br></br>
          {dataYearRange.population.start + " - " + dataYearRange.population.end}
        </div>
        <div className={`col-2 ${style.year_range_cell}`}>
          Global Temp Data
          <br></br>
          {dataYearRange.globalTemp.start + " - " + dataYearRange.globalTemp.end}
        </div>
        <div className={`col-2 ${style.year_range_cell}`}>
          Other Temp Data
          <br></br>
          {dataYearRange.otherTemp.start + " - " + dataYearRange.otherTemp.end}
        </div>
        <div className={`col-3`}></div>
      </div>
      <div className={`world_infor_chart ${style.world_infor_chart}`}>
        <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>
      </div>
    </div>

  )
}

export default Overview;