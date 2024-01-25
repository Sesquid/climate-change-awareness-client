import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { detailSlice } from '../../service/slices/detailviewSlice';
import { currentRegionSelector } from '../../service/selector/selector';
const CountryList = (props) => {

  const { countryList, keyWord } = props;

  const currentRegion = useSelector(currentRegionSelector);

  const dispatch = useDispatch()
  const [sortState, setSortState] = useState({
    orderByName: "asc",
    orderByPopulation: "noOrder",
    orderByTemperature: "noOrder"
  })

  const [currentCountryList, setCurrentCountryList] = useState([])

  const sortIcon = {
    asc: <i className="bi bi-arrow-up"></i>,
    desc: <i className="bi bi-arrow-down"></i>,
    noOrder: <i className="bi bi-arrow-down-up"></i>
  }

  const handleSort = (criteria) => {
    const newSortState = { ...sortState }

    Object.keys(newSortState).forEach((item) => {
      if (item !== criteria) {
        newSortState[item] = "noOrder"
      }
      else {
        newSortState[item] === "asc" ? newSortState[item] = "desc" : newSortState[item] = "asc"
      }
    })
    setSortState(newSortState)
  }
  const handleCurrentCountry = (item) => {
    dispatch(detailSlice.actions.setRegionInformation({
      ...currentRegion, countryName: item, regionType: 'country',
      latitude: "", longtitude: "", startTime: Date.now()
    }))
  }

  useEffect(() => {
    setCurrentCountryList(countryList.orderByName.asc)
  }, [countryList])

  useEffect(() => {
    for (let key in sortState) {
      if (sortState[key] !== "noOrder") {
        setCurrentCountryList(countryList[key][sortState[key]].filter((country) => {
          return country.toLowerCase().includes(keyWord.toLowerCase());
        }))
        break;
      }
    }
  }, [sortState, keyWord])


  return (
    <div className={style.country_list}>
      <div className={`row ${style.sort_criteria}`}>
        <div className={`col-6 btn btn-warning ${style.sort_criteria_cell}`}
          onClick={() => handleSort("orderByName")}
        >
          Name &nbsp;
          {sortIcon[sortState["orderByName"]]}
        </div>

        <div className={`col-6 btn btn-warning ${style.sort_criteria_cell}`}
          onClick={() => handleSort("orderByPopulation")}
        >
          Population &nbsp;
          {sortIcon[sortState["orderByPopulation"]]}
        </div>

        <div className={`col-6 btn btn-warning ${style.sort_criteria_cell}`}
          onClick={() => handleSort("orderByTemperature")}
        >
          Temperature &nbsp;
          {sortIcon[sortState["orderByTemperature"]]}
        </div>
      </div>
      <div className={style.country_list_body}>
        <ul>
          {currentCountryList.map((item, index) => {
            return (
              <div
                key={index}
                className={style.country_list_item}
                onClick={() => handleCurrentCountry(item)}
              >{item}</div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CountryList;