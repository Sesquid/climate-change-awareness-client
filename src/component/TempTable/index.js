import React from 'react'

const TempList = (props) => {

  const { tempList } = props;

  return (
    <table className="table table-danger">
      <thead>
        <tr>
          <th>Year</th>
          <th>Average Temperature</th>
          <th>Min Temperature</th>
          <th>Max Temperature</th>
        </tr>
      </thead>
      <tbody>
        {tempList.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.year}</td>
              <td>{item.avgTemp}</td>
              <td>{item.minTemp}</td>
              <td>{item.maxTemp}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TempList;