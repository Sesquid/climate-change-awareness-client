import React from 'react'

const RegionAvgTempTable = (props) => {
  const { data } = props;
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Country</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">Start year</th>
            <th scope="col">Time period</th>
            <th scope="col">Min Temp</th>
            <th scope="col">Avg Temp</th>
            <th scope="col">Max Temp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((region, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{region.country}</td>
                <td>{region.state}</td>
                <td>{region.city}</td>
                <td>{region.startYear}</td>
                <td>{region.timePeriod}</td>
                <td>{region.minTemp}</td>
                <td>{region.avgTemp}</td>
                <td>{region.maxTemp}</td>
              </tr>
            )
          })}


        </tbody>
      </table>
    </div>
  )
}

export default RegionAvgTempTable