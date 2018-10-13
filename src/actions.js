import request from './utils/request'
import { userLocation } from './utils/location'
import geocodeLocation from './utils/geocode'

import {
  FETCH_TIDES,
  FETCH_USER_LOCATION,
  FETCH_WEATHER,
  GET_LOCATION_NAME,
} from './types'

export function fetchLocation() {
  return dispatch => {
    userLocation().then(location => {
      dispatch({
        type: FETCH_USER_LOCATION,
        location: location,
      })

      fetchTides(location)
      fetchWeather(location)
      getLocationName(location)
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

export function getLocationName(location) {
  return dispatch => {
    geocodeLocation(location)
      .then(result => {
        const cityComponents = result.results[0].address_components.filter(
          function(addr) {
            return addr.types[0] === 'locality'
              ? 1
              : addr.types[0] === 'administrative_area_level_1' ? 1 : 0
          },
        )

        const locationName = cityComponents[0].long_name

        dispatch({
          type: GET_LOCATION_NAME,
          locationName: locationName,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
}
