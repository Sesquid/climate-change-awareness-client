import { extractDetails } from '../../util/util';

const CustomSelect = (props) => {

  const { handleSelectValue, list, field, secondField, disabled, isSelected } = props;

  return (
    <select className="form-select" style={{ margin: "10px" }}
      onChange={(e) => handleSelectValue(e)}
      disabled={disabled}
    >

      {!isSelected && (
        <option disabled selected value="default">
          Select a {extractDetails(field)}
        </option>
      )}
      {
        list.map(item => {
          return <option key={item.id} value={parseInt(item[secondField ?? field])}
          >{item[field]}</option>
        })
      }
    </select >
  )
}

export default CustomSelect;