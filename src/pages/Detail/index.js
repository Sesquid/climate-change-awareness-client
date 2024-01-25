import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { countryListSelector, currentRegionSelector, locationListSelector, populationListSelector, temperatureListSelector } from '../../service/selector/selector';
import CountryList from '../../component/CountryList';
import { detailSlice, getRegionPopulation, getRegionTemperature, getRegionsByCountry } from '../../service/slices/detailviewSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatNumber } from '../../util/util';
import { getAllCountriesList } from '../../service/slices/countryListSlice';
import { populationSlice } from '../../service/slices/populationSlice';
import { temperatureSlice } from '../../service/slices/temperatureSlice';
import TempList from '../../component/TempTable';
import PopulationTable from '../../component/PopulationTable';
import CustomSelect from '../../component/CustomSelect';
import { locationSlice } from '../../service/slices/locationSlice';
const { performance } = window;


const Detail = () => {

  const dispatch = useDispatch();

  const currentRegion = useSelector(currentRegionSelector);
  const countries = useSelector(countryListSelector);
  const temperatureList = useSelector(temperatureListSelector);
  const populationList = useSelector(populationListSelector);
  const locationList = useSelector(locationListSelector);
  const i = useRef(0)
  const [detail, setDetail] = useState({
    keyWord: "",
    tab: "population",
    isCompared: false,
    compareInfor: {
      firstYear: null,
      secondYear: null
    },
    currentDataList: {
      temperatureList: [],
      populationList: [],
      stateList: [],
      cityList: []
    },
    forbidSelect: {
      city: null,
      state: null
    }
  })

  const handleKeyWordChange = (e) => {
    setDetail(state => ({ ...detail, keyWord: e.target.value }));
  }

  const handleStartYear = (e) => {
    setDetail(state => ({
      ...detail, compareInfor: { ...detail.compareInfor, firstYear: e.target.value }
    }))
  }

  const handleEndYear = (e) => {
    setDetail(state => ({
      ...detail, compareInfor: { ...detail.compareInfor, secondYear: e.target.value }
    }))
  }

  const handleSelectTab = (tabName) => {
    setDetail(state => ({ ...detail, tab: tabName }))
    dispatch(detailSlice.actions.setRegionInformation(({
      ...currentRegion, regionType: "country", regionName: ""

    })))

  }

  const handleCompareData = () => {

  }



  const handleClearSelection = () => {
    setDetail(state => ({
      ...detail,
      forbidSelect: { ...detail.forbidSelect, state: null, city: null }
    }))

    dispatch(detailSlice.actions.setRegionInformation({
      ...currentRegion, regionType: "country", regionName: ""
    }))
  }

  const handleSelectCity = (e) => {
    setDetail(state => ({
      ...detail,
      forbidSelect: { ...detail.forbidSelect, state: true }
    }))
    const [name, latitude, longtitude] = e.target.value.split(";")
    dispatch(detailSlice.actions.setRegionInformation({
      ...currentRegion, regionType: "city", regionName: name,
      latitude: latitude, longtitude: longtitude
    }))
  }

  const handleSelectState = (e) => {
    setDetail(state => ({
      ...detail,
      forbidSelect: { ...detail.forbidSelect, city: true }
    }))
    dispatch(detailSlice.actions.setRegionInformation({
      ...currentRegion, regionType: "state", regionName: e.target.value
    }))

  }


  useEffect(() => {
    dispatch(getAllCountriesList());
    dispatch(detailSlice.actions.setRegionInformation({
      ...currentRegion, countryName: "World", regionType: 'country'
    }))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setDetail(state => ({
        ...detail, compareInfor: { ...detail.compareInfor, firstYear: null, secondYear: null }
      }));

      if (detail.tab === 'population') {
        if (!populationList.hasOwnProperty(currentRegion.countryName)) {
          await dispatch(getRegionPopulation({ countryName: currentRegion.countryName }));
          setDetail(state => ({
            ...detail,
            currentDataList: { ...detail.currentDataList, populationList: currentRegion.populationList }
          }));
          dispatch(populationSlice.actions.addCountry({
            countryName: currentRegion.countryName,
            populationList: currentRegion.populationList
          }));
        } else {
          setDetail(state => ({
            ...detail,
            currentDataList: { ...detail.currentDataList, populationList: populationList[currentRegion.countryName] }
          }));
        }
      }
      else {

        const region = currentRegion;
        const regionToFetch = region.regionType === 'city'
          ? region.regionName + ";" + region.latitude + ";" + region.longtitude
          : region.regionType === 'country' ? region.countryName : region.regionName;
        const regionInformation = {
          countryName: region.countryName,
          regionType: region.regionType,
          regionName: region.regionName,
          latitude: region.latitude,
          longtitude: region.longtitude
        }

        if (!locationList.hasOwnProperty(currentRegion.countryName)) {
          await dispatch(getRegionsByCountry(currentRegion.countryName))
          setDetail(state => ({
            ...detail, currentDataList: {
              ...detail.currentDataList,
              stateList: currentRegion.stateList, cityList: currentRegion.cityList
            }
          }))
          dispatch(locationSlice.actions.addCountryRegions({
            countryName: currentRegion.countryName,
            cityList: currentRegion.cityList,
            stateList: currentRegion.stateList
          }))
        }
        else {
          setDetail(state => ({
            ...detail, currentDataList: {
              ...detail.currentDataList,
              cityList: locationList[currentRegion.countryName].cityList,
              stateList: locationList[currentRegion.countryName].stateList
            }
          }))
        }

        if (!temperatureList.hasOwnProperty(regionToFetch)) {
          await dispatch(getRegionTemperature({
            region: regionInformation,
            startTime: Date.now()
          }))
          setDetail(state => {
            // console.log(i.current++);
            // console.log('setCurrentState ' + (Date.now() - currentRegion.startTime) + "ms")
            return {
              ...detail,
              currentDataList: { ...detail.currentDataList, temperatureList: currentRegion.temperatureList }
            }
          });
          dispatch(temperatureSlice.actions.addTemperature({
            region: regionInformation,
            temperatureList: currentRegion.temperatureList
          }));
        }
        else {

          setDetail(state => ({
            ...detail,
            currentDataList: { ...detail.currentDataList, temperatureList: temperatureList[regionToFetch] }
          }));
        }
      }
    };
    fetchData();

  }, [currentRegion, detail.tab]);

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
            <CountryList countryList={countries} keyWord={detail.keyWord} ></CountryList>
          </div>

          <div className={`col-9`}>
            <hr></hr>
            <button className='btn btn-warning' onClick={() => { handleSelectTab("population") }}>Population</button>
            <button className='btn btn-danger' onClick={() => { handleSelectTab("temperature") }}>Temperature</button>
            <hr></hr>
            <div className={style.region_name}>{currentRegion.countryName + " " + detail.tab}</div>
            <div className={style.region_name}>{currentRegion.regionName}</div>
            <div className={style.compare_site}>
              {detail.tab === 'temperature' ?
                <div className={style.year_select}>
                  <CustomSelect
                    handleSelectValue={handleSelectState} value={detail.forbidSelect.state}
                    list={detail.currentDataList.stateList} field={"stateName"}
                    disabled={detail.forbidSelect.state === null ? false : true} itemName={"state"}
                  ></CustomSelect>
                  <CustomSelect
                    handleSelectValue={handleSelectCity} value={detail.forbidSelect.city}
                    list={detail.currentDataList.cityList} field={'cityName'} itemName={'city'}
                    disabled={detail.forbidSelect.city === null ? false : true}
                  ></CustomSelect>
                  <button className='btn btn-warning' onClick={() => handleCompareData()}>View Region Temperature</button>
                  <button className='btn btn-warning'
                    onClick={() => {
                      handleCompareData();
                      handleClearSelection();
                    }}>Clear Selection</button>
                </div>
                : ""}
            </div>
            <hr></hr>
            <div className={style.compare_site}>
              <div className={style.year_select}>
                <CustomSelect
                  handleSelectValue={handleStartYear} value={detail.compareInfor.firstYear}
                  list={detail.currentDataList[detail.tab + "List"]} field={"year"} disabled={false} itemName={"year"}
                ></CustomSelect>
                <CustomSelect
                  handleSelectValue={handleEndYear} value={detail.compareInfor.secondYear}
                  list={detail.currentDataList[detail.tab + "List"].filter(item => item.year > detail.compareInfor.firstYear)} field={"year"}
                  disabled={detail.compareInfor.firstYear === null ? true : false} itemName={"year"}
                ></CustomSelect>
                <button className='btn btn-warning' onClick={() => handleCompareData()}>Compare</button>
              </div>
            </div>
            <hr></hr>
            <div className={style.information_site}>

              {detail.tab === 'population' ?
                <PopulationTable
                  popList={detail.currentDataList.populationList}
                ></PopulationTable>
                : <TempList
                  tempList={detail.currentDataList.temperatureList}
                ></TempList>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;