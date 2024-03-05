import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

const CountryList = (props) => {

  const { countryList, filter, handleFilterChange, handleSelectCountry, keyWord } = props;
  const [currentCountryList, setCurrentCountryList] = useState(countryList)
  const arrowState = {
    asc: <i className="bi bi-arrow-up"></i>,
    desc: <i className="bi bi-arrow-down"></i>,
    other: <i className="bi bi-arrow-down-up"></i>
  }

  
  useEffect(() => {
    setCurrentCountryList(countryList.filter(
      (item) => item.countryName.toLowerCase().includes(keyWord.toLowerCase())
    ))
  }, [keyWord, countryList])

  return (
    <div className={style.country_list}>
      <div className={`row ${style.sort_criteria}`}>
        <div className={`col-6 btn btn-warning ${style.sort_criteria_cell}`}
          onClick={() => {
            let newFilter = {
              type: "name",
              order: "asc"
            }
            if (filter.type === 'name') {
              filter.order === "asc" ? newFilter.order = "desc"
                : newFilter.order = "asc"
            }
            handleFilterChange(filter => newFilter);
          }}
        >
          Name &nbsp;
          {filter.type === "name" ? arrowState[filter.order] : arrowState.other}
        </div>

        <div className={`col-6 btn btn-warning ${style.sort_criteria_cell}`}
          onClick={() => {
            let newFilter = {
              type: "population",
              order: "asc"
            }
            if (filter.type === 'population') {
              filter.order === "asc" ? newFilter.order = "desc"
                : newFilter.order = "asc"
            }
            handleFilterChange(filter => newFilter);
          }}
        >
          Population &nbsp;
          {filter.type === "population" ? arrowState[filter.order] : arrowState.other}
        </div>

        <div className={`col-6 btn btn-warning ${style.sort_criteria_cell}`}
          onClick={() => {
            
            let newFilter = {
              type: "temperature",
              order: "asc"
            }
            if (filter.type === 'temperature') {
              filter.order === "asc" ? newFilter.order = "desc"
                : newFilter.order = "asc"
            }
            handleFilterChange(filter => newFilter);
          }}
        >
          Temperature &nbsp;
          {filter.type === "temperature" ? arrowState[filter.order] : arrowState.other}
        </div>
      </div>
      <div className={style.country_list_body}>
        <ul>
          {currentCountryList.map((item, index) => {
            return (
              <div
                key={index}
                className={style.country_list_item}
                onClick={() => handleSelectCountry(item)}
              >{item.countryName}</div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CountryList;