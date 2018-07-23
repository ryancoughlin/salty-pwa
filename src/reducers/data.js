import { FETCH_TIDES, FETCH_LOCATION, FETCH_WEATHER } from '../types'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        ...state,
        ...action.location,
      }
    case FETCH_TIDES:
      return {
        ...state,
        ...action.tides,
      }
    case FETCH_WEATHER:
      return {
        ...state,
        ...action.weather,
      }
    default:
      return state
  }
}
