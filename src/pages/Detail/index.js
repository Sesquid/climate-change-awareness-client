import React, { useEffect, useState } from 'react'
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { countryListSelector, regionTemperatureAndPopulationSelector } from '../../service/selector/selector';
import CountryList from '../../component/CountryList';
import { detailSlice, getAllCountriesList, getRegionTemperatureAndPopulation } from '../../service/slices/detailviewSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
const Detail = () => {

  const dispatch = useDispatch();
  const regionTemperatureAndPopulation = useSelector(regionTemperatureAndPopulationSelector);
  
  useEffect(() => {
    dispatch(getAllCountriesList());
    dispatch(getRegionTemperatureAndPopulation('World'))
    dispatch(detailSlice.actions.setRegion("World"))
  }, [])
  
  const countryList = useSelector(countryListSelector);

  const [keyWord, setKeyWord] = useState("");
  const [tab, setTab] = useState("Population")
  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
    console.log(regionTemperatureAndPopulation)
  }

  return (
    <div className='' style={{overflow: "hidden"}}>
      <div className='row'>
        <div className={style.detail_search_bar}>
          <input 
            value={keyWord} 
            type='text' 
            placeholder='Search'
            onChange={(e) => handleKeyWordChange(e)}
          ></input>
        </div>
      </div>
      <div className='row'>
        <div className={style.detail_body}>
          <div className={`col-3`}>
            <CountryList countryList={countryList} keyWord={keyWord} ></CountryList>
          </div>
          <div className={`col-9`}>
            <div className={style.region_name}>{regionTemperatureAndPopulation.region + " " + tab}</div>
            <div className={style.compare_site}>
              <div className={style.year_select}>
                <select class="form-select">
                  {regionTemperatureAndPopulation.populationList.map(item => {
                    return <option value={item.year}>{item.year}</option>
                  })}
                </select>
                <select class="form-select">
                  {regionTemperatureAndPopulation.populationList.map(item => {
                    return <option value={item.year}>{item.year}</option>
                  })}
                </select>
              </div>
            </div>
            <hr></hr>
            <div className={style.information_site}>
              <button className='btn btn-warning'
                onClick={() => {
                  setTab("Population")
                }}
              >Population</button>
              &nbsp;
              <button className='btn btn-danger'
                onClick={() => {
                  setTab("Temperature")
                }}
              >Temperature</button>
              <hr></hr>
              {tab === 'Population' ?
                <table className="table table-warning">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {regionTemperatureAndPopulation.populationList.map((item) => {
                    return (
                      <tr>
                        <td>{item.year}</td>
                        <td>{item.population}</td>
                      </tr>
                    )
                  })}
                </tbody>
                
              </table>
              :  
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
                  {regionTemperatureAndPopulation.temperatureList.map((item) => {
                    return (
                      <tr>
                        <td>{item.year}</td>
                        <td>{item.avgTemp}</td>
                        <td>{item.minTemp}</td>
                        <td>{item.maxTemp}</td>
                      </tr>
                    )
                  })}
                </tbody>
                
              </table>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail