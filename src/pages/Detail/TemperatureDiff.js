import React from 'react'

const TemperatureDiff = (props) => {
  const { yearRange, currentTemperatureDiff } = props;
  return (
    <div>
      <hr></hr>
      Average Temperature in {yearRange.firstYear}: {currentTemperatureDiff.startYearAvgTemperature}
      <br></br>
      Min Temperature in {yearRange.firstYear}: {currentTemperatureDiff.startYearMinTemperature}
      <br></br>
      Max Temperature in {yearRange.firstYear}: {currentTemperatureDiff.startYearMaxTemperature}
      <br></br>
      Average Temperature in {yearRange.secondYear}: {currentTemperatureDiff.endYearAvgTemperature}
      <br></br>
      Min Temperature in {yearRange.secondYear}: {currentTemperatureDiff.endYearMinTemperature}
      <br></br>
      Max Temperature in {yearRange.secondYear}: {currentTemperatureDiff.endYearMaxTemperature}
      <br></br>
      Difference in Average Temperature between 2 years: {currentTemperatureDiff.avgTemperatureDifference}
      <br></br>
      Difference in Min Temperature between 2 years: {currentTemperatureDiff.minTemperatureDifference}
      <br></br>
      Difference in Max Temperature between 2 years: {currentTemperatureDiff.maxTemperatureDifference}
    </div>
  )
}

export default TemperatureDiff