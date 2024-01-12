import React, { useState } from 'react'
import style from './style.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
const CountryList = (props) => {
  
  const sortIcon = {
    up: <i class="bi bi-arrow-up"></i>,
    down: <i class="bi bi-arrow-down"></i>,
    bothDir: <i class="bi bi-arrow-down-up"></i>
  }

  const [sortState, setSortState] = useState({
    isSorted: true,
    criteria: "orderByName",
    status: "asc"
  })

  const {countryList} = props;
  return (
    <div className={style.country_list}>
      <div className={`row ${style.sort_criteria}`}>
        <div className={`col-3 btn btn-warning ${style.sort_criteria_cell}`}>
          Name
          {sortIcon.up}
        </div>
        <div className={`col-4 btn btn-warning ${style.sort_criteria_cell}`}>Population</div>
        <div className={`col-4 btn btn-warning ${style.sort_criteria_cell}`}>Temperature</div>
      </div>
      <div className={style.country_list_body}> 
        <ul>
          {countryList.orderByName.asc.map((item) => {
            return(
              <div>{item}</div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CountryList;