import request from './utils/request'
import { userLocation } from './utils/location'
import geocodeLocation from './utils/geocode'

import {
  FETCH_TIDES,
  FETCH_TIDE_CHART,
  FETCH_SWELLS,
  FETCH_USER_LOCATION,
  FETCH_WEATHER,
  FETCH_WATER_TEMPERATURE,
  FETCH_NEARBY_STATIONS,
  GET_LOCATION_NAME,
} from './types'

export function fetchLocation() {
  alert('firing location')
  return dispatch => {
    userLocation().then(location => {
      dispatch({
        type: FETCH_USER_LOCATION,
        location,
      })

      this.getLocationName(location)
      this.fetchTides(location)
      this.fetchSwells(location)
      this.fetchTideChart(location)
      this.fetchWeather(location)
      this.fetchWaterTemperature(location)
      this.fetchNearbyStations(location)
    })
  }
}

export function fetchTides(location) {
  const { latitude, longitude } = location
  return dispatch => {
    request(`/tide-table?latitude=${latitude}&longitude=${longitude}`)
      .then(tides => {
        if (Object.keys(tides).length === 0) {
          console.log('empty tide response')
        } else {
          dispatch({
            type: FETCH_TIDES,
            tides,
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export function fetchSwells(location) {
  const { latitude, longitude } = location
  console.log('FETCH SWELL')
  return dispatch => {
    request(`/swell?latitude=${latitude}&longitude=${longitude}`)
      .then(swells => {
        if (Object.keys(swells).length === 0) {
          console.log('empty tide response')
        } else {
          dispatch({
            type: FETCH_SWELLS,
            swells,
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export function fetchTideChart(location) {
  const { latitude, longitude } = location
  return dispatch => {
    request(`/tide-chart?latitude=${latitude}&longitude=${longitude}`)
      .then(data => {
        console.log(data)
        if (Object.keys(data).length === 0) {
          console.log('empty tide response')
        } else {
          dispatch({
            type: FETCH_TIDE_CHART,
            tideChart: data,
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export function fetchWaterTemperature(location) {
  const { latitude, longitude } = location
  return dispatch => {
    request(`/water-temperature?latitude=${latitude}&longitude=${longitude}`)
      .then(data => {
        if (Object.keys(data).length === 0) {
          console.log('empty tide response')
        } else {
          dispatch({
            type: FETCH_WATER_TEMPERATURE,
            waterTemperature: data,
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
          weather,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export function fetchNearbyStations(location) {
  const { latitude, longitude } = location
  return dispatch => {
    request(`/nearby-stations?latitude=${latitude}&longitude=${longitude}`)
      .then(nearbyStations => {
        dispatch({
          type: FETCH_NEARBY_STATIONS,
          nearbyStations,
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
          addr =>
            addr.types[0] === 'locality'
              ? 1
              : addr.types[0] === 'administrative_area_level_1'
              ? 1
              : 0,
        )

        const locationName = cityComponents[0].long_name

        dispatch({
          type: GET_LOCATION_NAME,
          locationName,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
}
