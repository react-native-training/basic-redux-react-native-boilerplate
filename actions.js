import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'

export function fetchDataFromAPI() {
  return (dispatch) => {
    dispatch(getData())
    fetch('https://data.cityofnewyork.us/api/views/5b3a-rs48/rows.json')
    .then(data => data.json())
    .then(json => {
      console.log('columns:', json.meta.view.columns)
      console.log('meta:', json.meta.view)
      const sample = json.data.slice(0, 400)
      dispatch(getDataSuccess(sample))
    })
    .catch(err => dispatch(getDataFailure(err)))
  }
}

export function getData() {
  return {
    type: FETCHING_DATA
  }
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  }
}
