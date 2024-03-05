import React from 'react'

const PopulationDiff = (props) => {
  const { yearRange, currentPopulationDiff } = props
  return (
    <div>
      <hr></hr>
      Population in {yearRange.firstYear}: {currentPopulationDiff.startYearPopulation}
      <br></br>
      Population in {yearRange.secondYear}: {currentPopulationDiff.endYearPopulation}
      <br></br>
      Difference in Population between 2 years: {currentPopulationDiff.populationDifference}
    </div>
  )
}

export default PopulationDiff