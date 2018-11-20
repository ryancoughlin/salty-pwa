import {
  FETCH_TIDES,
  FETCH_TIDE_CHART,
  FETCH_SWELLS,
  FETCH_WATER_TEMPERATURE,
  FETCH_USER_LOCATION,
  FETCH_WEATHER,
  GET_LOCATION_NAME,
  FETCH_NEARBY_STATIONS,
} from '../types';

const initialState = {
  location: {},
  locationName: null,
  tides: {},
  swells: {},
  weather: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    case FETCH_TIDES:
      return {
        ...state,
        tides: action.tides,
      };
    case FETCH_TIDE_CHART:
      return {
        ...state,
        tideChart: action.tideChart,
      };
    case FETCH_SWELLS:
      return {
        ...state,
        swells: action.swells,
      };
    case FETCH_WATER_TEMPERATURE:
      return {
        ...state,
        waterTemperature: action.waterTemperature,
      };
    case FETCH_WEATHER:
      return {
        ...state,
        weather: action.weather,
      };
    case FETCH_NEARBY_STATIONS:
      return {
        ...state,
        nearbyStations: action.nearbyStations,
      };
    case GET_LOCATION_NAME:
      return {
        ...state,
        locationName: action.locationName,
      };
    default:
      return state;
  }
}
