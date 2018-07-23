import request from './utils/request'
import { userLocation } from './utils/location'

import { FETCH_TIDES, FETCH_LOCATION, FETCH_WEATHER } from './types'

export function fetchLocation() {
  return dispatch => {
    userLocation().then(location => {
      dispatch({
        type: FETCH_LOCATION,
        location: location,
      })
    })
  }
}

export function fetchTides(location) {
  const { latitude, longitude } = location
  return dispatch => {
    request(`/tides?latitude=${latitude}&longitude=${longitude}`)
      .then(tides => {
        if (Object.keys(tides).length === 0) {
          console.log('empty tide response')
        } else {
          dispatch({
            type: FETCH_TIDES,
            tides: tides,
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export function fetchWeather(location) {
  const { latitude, longitude } = location
  return dispatch => {
    request(`/weather?latitude=${latitude}&longitude=${longitude}`)
      .then(weather => {
        dispatch({
          type: FETCH_WEATHER,
          weather: weather,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
}
