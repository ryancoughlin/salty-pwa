import { fromJS } from 'immutable'
import mapStyle from './map-style.json'

export const dataLayer = fromJS({
  id: 'data',
  source: 'stationList',
  type: 'fill',
  interactive: true,
})

export const defaultMapStyle = fromJS(mapStyle)
