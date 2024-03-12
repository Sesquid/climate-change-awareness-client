import React from 'react'
import Loading from '../Loading/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSimilarRegionByTemperature } from '../../hooks/useTemperature';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const SimilarRegionModal = (props) => {

  const getCountryName = (id) => {
    let country = countryList.find(item => item.id === id)
    return country.countryName
  }

  const getStateName = (id) => {
    let state = stateList.find(item => item.id === id)
    return state ? state.stateName : "--"
  }

  const getCityName = (id) => {
    let city = cityList.find(item => item.id === id)
    return city ? city.cityName : "--"
  }

  const { handleShowing, RegionInformation, countryList, cityList, stateList } = props;
  const { data, isLoading } = useSimilarRegionByTemperature(RegionInformation)
  return (
    <Modal
      show={true}
      backdrop="static"
      keyboard={false}

    >
      <Modal.Header>
        <Modal.Title>Similar regions</Modal.Title>
      </Modal.Header>
      {isLoading ?
        <Loading></Loading> : <Modal.Body>
          <div style={{ overflowX: "auto", maxWidth: "100%" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Country</th>
                  <th scope="col">State</th>
                  <th scope="col">City</th>
                  <th scope="col">Start Year</th>
                  <th scope="col">End Year</th>
                  <th scope="col">Min Temp</th>
                  <th scope="col">Avg Temp</th>
                  <th scope="col">Max Temp</th>
                  <th scope="col">Temp Diff</th>
                </tr>
              </thead>
              <tbody>
                {data.map((region, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{getCountryName(region.country)}</td>
                      <td>{getStateName(region.state)}</td>
                      <td>{getCityName(region.city)}</td>
                      <td>{region.periodStartYear}</td>
                      <td>{region.periodEndYear}</td>
                      <td>{region.minTemperature}</td>
                      <td>{region.averageTemperature}</td>
                      <td>{region.maxTemperature}</td>
                      <td>{region.temperatureDifference}</td>
                    </tr>
                  )
                })}


              </tbody>
            </table>
          </div>

        </Modal.Body>}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleShowing(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SimilarRegionModal