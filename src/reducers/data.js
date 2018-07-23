import {
  FETCH_TIDES,
  FETCH_LOCATION,
  FETCH_WEATHER,
  GET_LOCATION_NAME,
} from '../types'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        ...state,
        location: action.location,
      }
    case FETCH_TIDES:
      return {
        ...state,
        tides: action.tides,
      }
    case FETCH_WEATHER:
      return {
        ...state,
        weather: action.weather,
      }
    case GET_LOCATION_NAME:
      return {
        ...state,
        locationName: action.locationName,
      }
    default:
      return state
  }
}
