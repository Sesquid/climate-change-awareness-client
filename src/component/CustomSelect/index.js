import React from 'react'
import { detailSlice } from '../../service/slices/detailviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { currentRegionSelector } from '../../service/selector/selector';

const CustomSelect = (props) => {

  const { handleSelectValue, value, list, field, disabled, itemName } = props;

  const currentRegion = useSelector(currentRegionSelector)

  const dispatch = useDispatch();

  return (
    <select className="form-select"
      onChange={(e) => handleSelectValue(e)}
      disabled={disabled}
    >
      {value === null ? <option selected disabled>Select a {itemName}</option> : ""}
      {list.map(item => {
        // console.log(item)
        return <option key={item.id} value={(itemName === 'city') ?
          item[field] + ";" + item.latitude + ";" + item.longtitude : item[field]}
        >{item[field]}</option>
      })}
    </select>
  )
}

export default CustomSelect;