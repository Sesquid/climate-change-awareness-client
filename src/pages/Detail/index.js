import React, { useEffect, useState } from 'react'
import style from './style.module.css';
import CountryList from '../../components/CountryList';
import 'bootstrap/dist/css/bootstrap.min.css';
import TempList from '../../components/TempTable';
import PopulationTable from '../../components/PopulationTable';
import CustomSelect from '../../components/CustomSelect';
import { useCountry, useCountryCity, useCountryState } from '../../hooks/useRegion';
import { useCountryPopulation, usePopulationDifference } from '../../hooks/usePopulation';
import { useCountryTemperature, useCountryTemperatureDifference, useRegionAverageTemperatureInTimePeriod } from '../../hooks/useTemperature';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { isIllegalNumber, isIllegalTemperature } from '../../util/util';
import SimilarRegionModal from '../../components/SimilarRegionModal';
import PopulationDiff from './PopulationDiff';
import TemperatureDiff from './TemperatureDiff';
import RegionAvgTempTable from '../../components/RegionAvgTempTable';
import { PopulationChart, TemperatureChart } from '../../components/CustomRechart';

const Detail = () => {

  const [detail, setDetail] = useState({
    isCompared: false,
    inforDisplayWay: "table",
    tab: "population",
    keyWord: "",
    isFindingRegion: false
  })

  const [yearRange, setYearRange] = useState({
    firstYear: 0,
    secondYear: 0
  })

  const [currentPopulationDiff, setCurrentPopulationDiff] = useState({
    startYearPopulation: 0,
    endYearPopulation: 0,
    populationDifference: 0
  });

  const [currentTemperatureDiff, setCurrentTemperatureDiff] = useState({
    endYearMaxTemperature: 0,
    startYearAvgTemperature: 0,
    startYearMinTemperature: 0,
    maxTemperatureDifference: 0,
    endYearMinTemperature: 0,
    startYearMaxTemperature: 0,
    endYearAvgTemperature: 0,
    minTemperatureDifference: 0,
    avgTemperatureDifference: 0
  })

  const [filter, setFilter] = useState({
    type: "name",
    order: "asc"
  })

  const [currentCountry, setCurrentCountry] = useState({
    id: 201,
    countryCode: "VNM",
    countryName: "Vietnam"
  })

  const [regionInformation, setRegionInformation] = useState({
    countryId: 201,
    startYear: 0,
    timePeriod: 1,
    limit: 1,
    cityId: 0,
    stateId: 0
  });

  const [avgTempListByTimePeriod, setAvgTempListByTimePeriod] = useState([])

  useEffect(() => {
    setRegionInformation({ ...regionInformation, countryId: currentCountry.id })
  }, [currentCountry])


  const { data: countries } = useCountry(filter);
  const { data: populationList } = useCountryPopulation(currentCountry.countryCode);
  const { data: temperatureList } = useCountryTemperature(currentCountry.id);
  const { data: cityList } = useCountryCity(currentCountry.countryCode);
  const { data: stateList } = useCountryState(currentCountry.countryCode);
  const { data: populationDiff } = usePopulationDifference(
    currentCountry.countryCode,
    yearRange.firstYear,
    yearRange.secondYear
  )
  const { data: temperatureDiff } = useCountryTemperatureDifference(
    currentCountry.id,
    yearRange.firstYear,
    yearRange.secondYear,
  )
  const { data: avgTempByTimePeriod } = useRegionAverageTemperatureInTimePeriod(regionInformation);


  const handleFilterChange = (filter) => {
    setFilter(filter);
  }

  const handleSelectCountry = (country) => {
    setCurrentCountry(country);
    setDetail({ ...detail, isCompared: false })
    setRegionInformation({ ...regionInformation, cityId: 0, stateId: 0 })
  }

  const handleKeyWordChange = (e) => {
    setDetail({ ...detail, keyWord: e.target.value });
  }

  const handleChangeTab = (tab) => {
    setDetail({ ...detail, isCompared: false, tab: tab })
    setYearRange({ firstYear: 0, secondYear: 0 })
  }

  const handleStartYear = (e) => {

    setDetail(state => ({
      ...detail, isCompared: false
    }))
    setYearRange({ ...yearRange, firstYear: e.target.value })
  }

  const handleEndYear = (e) => {
    setDetail(state => ({
      ...detail, isCompared: false
    }))
    setYearRange({ ...yearRange, secondYear: e.target.value })
  }

  const handleCompareData = () => {
    setDetail({
      ...detail, isCompared: true,
    })
    detail.tab === "population" ? setCurrentPopulationDiff(populationDiff)
      : setCurrentTemperatureDiff(temperatureDiff);
  }

  const handleClearSelection = () => {
    setRegionInformation({
      ...regionInformation, cityId: 0, stateId: 0
    })
  }

  const handleChangeInforDisplayType = (type) => {
    setDetail({ ...detail, inforDisplayWay: type })
  }

  const handleSelectTimePeriod = (e) => {
    !isIllegalNumber(e.target.value) ? alert("Please enter only number")
      : setRegionInformation({ ...regionInformation, timePeriod: e.target.value })
  }

  const handleSelectLimit = (e) => {
    !isIllegalNumber(e.target.value) ? alert("Please enter only number")
      : setRegionInformation({ ...regionInformation, limit: e.target.value })
  }

  const handleSelectStartYear = (e) => {
    setRegionInformation({ ...regionInformation, startYear: e.target.value })
  }

  const handleSelectCity = (e) => {
    setRegionInformation({ ...regionInformation, cityId: parseInt(e.target.value) })
  }

  const handleSelectState = (e) => {
    setRegionInformation({ ...regionInformation, stateId: parseInt(e.target.value) })
  }

  const handleFindSimilarRegion = (state) => {
    setDetail({ ...detail, isFindingRegion: state });
  }

  const handleFindAverageTemperature = () => {

    let country = countries.find(item => item.id === regionInformation.countryId)
    let state = stateList.find(item => item.id === regionInformation.stateId)
    let city = cityList.find(item => item.id === regionInformation.cityId)

    let avgTemp = {
      ...avgTempByTimePeriod,
      country: country ? country.countryName : "--",
      state: state ? state.stateName : "--",
      city: city ? city.cityName : "--",
      startYear: regionInformation.startYear,
      timePeriod: regionInformation.timePeriod
    }
    let newAvgTempList = [...avgTempListByTimePeriod]
    newAvgTempList.push(avgTemp);
    setAvgTempListByTimePeriod([...newAvgTempList])
  }

  return (
    <div className='container' style={{ overflow: "hidden" }}>
      <div className='row'>
        <div className={style.detail_search_bar}>
          <input value={detail.keyWord} type='text'
            placeholder='Search' onChange={(e) => handleKeyWordChange(e)}>
          </input>
        </div>
      </div>
      <div className='row'>
        <div className={style.detail_body}>
          <div className={`col-3`}>
            <CountryList
              countryList={countries ?? []}
              filter={filter}
              keyWord={detail.keyWord}
              handleFilterChange={handleFilterChange}
              handleSelectCountry={handleSelectCountry}
            ></CountryList>
          </div>
          <div className={`col-9`}>
            <hr></hr>
            <button className='btn btn-warning' onClick={() => { handleChangeTab("population") }}>Population</button>
            <button className='btn btn-danger' onClick={() => { handleChangeTab("temperature") }}>Temperature</button>
            <hr></hr>
            <div className={style.region_name}>{currentCountry.countryName + " " + detail.tab}</div>
            {detail.tab === 'temperature' ?
              (
                <>
                  <hr></hr>
                  <div className={style.year_select}>
                    Start year:&nbsp;
                    <CustomSelect
                      handleSelectValue={handleSelectStartYear} value={yearRange.firstYear}
                      list={temperatureList ?? []}
                      field={"year"} disabled={false}

                    ></CustomSelect>
                    Time Period:
                    <input type='number' min={1} max={50}
                      onChange={handleSelectTimePeriod} value={regionInformation.timePeriod}
                      style={{
                        padding: "5px 10px",
                        border: "2px rgba(128, 128, 128, 0.5) solid",
                        borderRadius: "5px",
                        margin: "10px"
                      }}></input>
                    Limit:
                    <input type='number' min={1}
                      onChange={handleSelectLimit} value={regionInformation.limit}
                      style={{
                        padding: "5px 10px",
                        border: "2px rgba(128, 128, 128, 0.5) solid",
                        borderRadius: "5px",
                        margin: "10px"
                      }}></input>


                  </div>
                  <br></br>
                  <div className={style.year_select}>
                    City:
                    <CustomSelect
                      handleSelectValue={handleSelectCity} value={yearRange.secondYear}
                      list={cityList ?? []}
                      field={"cityName"}
                      secondField={"id"}
                      isSelected={regionInformation.cityId !== 0}
                      disabled={regionInformation.stateId !== 0}
                    ></CustomSelect>
                    State:
                    <CustomSelect
                      handleSelectValue={handleSelectState} value={yearRange.secondYear}
                      list={stateList ?? []}
                      field={"stateName"}
                      secondField={"id"}
                      isSelected={regionInformation.stateId !== 0}
                      disabled={regionInformation.cityId !== 0}
                    ></CustomSelect>
                    <button className='btn btn-warning' onClick={() => { handleClearSelection() }}>Reset</button>

                  </div>
                  {detail.isFindingRegion && <SimilarRegionModal
                    // isShowing={isFindingRegion}
                    handleShowing={handleFindSimilarRegion}
                    RegionInformation={regionInformation}
                    countryCode={currentCountry.countryCode}
                    countryList={countries}
                    cityList={cityList}
                    stateList={stateList}
                  ></SimilarRegionModal>}
                  <button className='btn btn-warning'
                    disabled={true}
                    onClick={() => {
                      handleFindSimilarRegion(true)

                    }}>Find Similar Region</button>
                  <button className='btn btn-danger'
                    disabled={regionInformation.startYear === 0}
                    onClick={() => {
                      handleFindAverageTemperature(true)
                    }}>View Average Temperature</button>
                  <RegionAvgTempTable
                    data={avgTempListByTimePeriod}
                  ></RegionAvgTempTable>
                </>
              ) : (
                <></>
              )
            }

            <hr></hr>
            <div className={style.compare_site}>
              <h2>Compare Information between 2 years</h2>
              <br></br>
              <div className={style.year_select}>
                <CustomSelect
                  handleSelectValue={handleStartYear} value={yearRange.firstYear}
                  list={detail.tab === 'population' ? populationList ?? [] : temperatureList ? temperatureList.filter(item => isIllegalTemperature(item)) : []}
                  field={"year"} disabled={false}
                  isSelected={yearRange.firstYear !== 0}
                ></CustomSelect>
                <CustomSelect
                  handleSelectValue={handleEndYear} value={yearRange.secondYear}
                  list={(detail.tab === 'population' ? populationList ?? [] : temperatureList ? temperatureList.filter(item => isIllegalTemperature(item)) : [])}
                  field={"year"}
                  isSelected={yearRange.secondYear !== 0}
                ></CustomSelect>
                <button disabled={yearRange.secondYear === 0 ? true : false} className='btn btn-warning' onClick={() => handleCompareData()}>Compare</button>


              </div>
              {
                detail.isCompared && detail.tab === 'population' &&
                <PopulationDiff
                  yearRange={yearRange}
                  currentPopulationDiff={currentPopulationDiff}
                ></PopulationDiff>
              }
              {
                detail.isCompared && detail.tab === 'temperature' &&
                <TemperatureDiff
                  yearRange={yearRange}
                  currentTemperatureDiff={currentTemperatureDiff}
                ></TemperatureDiff>
              }
            </div>
            <hr></hr>
            <div className={style.information_site}>
              <h2>Displaying Ways</h2>
              <br></br>
              <button className='btn btn-warning' onClick={() => { handleChangeInforDisplayType("table") }}>Table</button>
              <button className='btn btn-danger' onClick={() => { handleChangeInforDisplayType("chart") }}>Chart</button>
              <hr></hr>

              {detail.tab === 'population' ?
                detail.inforDisplayWay === 'table' ?
                  (
                    <PopulationTable
                      popList={populationList ?? []}
                    ></PopulationTable>
                  ) : (
                    <PopulationChart
                      dataList={populationList ?? []}
                      chartTitle={""}
                    ></PopulationChart>
                  )
                : detail.inforDisplayWay === 'table' ? (
                  <TempList
                    tempList={temperatureList ?? []}
                  ></TempList>
                ) : (
                  <TemperatureChart
                    dataList={temperatureList ?? []}
                  ></TemperatureChart>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;