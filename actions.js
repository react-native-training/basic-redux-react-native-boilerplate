import { FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE } from './constants'

export function fetchPeopleFromAPI() {
  return (dispatch) => {
    dispatch(getPeople())
    fetch('https://swapi.co/api/people/')
    .then(data => data.json())
    .then(json => {
      console.log('json:', json)
      dispatch(getPeopleSuccess(json.results))
    })
    .catch(err => dispatch(getPeopleFailure(err)))
  }
}

export function getPeople() {
  return {
    type: FETCHING_PEOPLE
  }
}

export function getPeopleSuccess(data) {
  return {
    type: FETCHING_PEOPLE_SUCCESS,
    data,
  }
}

export function getPeopleFailure() {
  return {
    type: FETCHING_PEOPLE_FAILURE
  }
}
