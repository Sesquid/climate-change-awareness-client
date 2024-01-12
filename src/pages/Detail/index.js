import React, { useEffect } from 'react'
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { countryListSelector } from '../../service/selector/selector';
import CountryList from '../../component/CountryList';
import { getAllCountriesList } from '../../service/slices/detailviewSlice';

const Detail = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountriesList());
  }, [])
  
  const countryList = useSelector(countryListSelector);

  return (
    <div className=''>
      <div className='row'>
        <div className={style.detail_search_bar}>
          <input type='text' placeholder='Search'></input>
        </div>
      </div>
      <div className='row'>
        <div className={style.detail_body}>
          <div className={`col-3`}>
            <CountryList countryList={countryList} ></CountryList>
          </div>
          <div className={`col-9`}>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail