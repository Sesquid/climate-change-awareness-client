import React from 'react'
import { formatNumber } from '../../util/util';

const PopulationTable = (props) => {

  const { popList } = props;

  return (
    <table className="table table-warning">
      <thead>
        <tr>
          <th>Year</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {popList.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.year}</td>
              <td>{formatNumber(item.population)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PopulationTable