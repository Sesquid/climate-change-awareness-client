import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts';
import React from 'react'
import style from './style.module.css'

const CustomChart = (props) => {
  const {options} = props
  return (
    <div className={style.chart}>
      <HighchartsReact highcharts={Highcharts} options={options}></HighchartsReact>
    </div>
  )
}

export default CustomChart;