import React, { Component } from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'
import ReactMapGL, { Marker } from 'react-map-gl'
import GeoJSON from 'geojson'
import { fromJS } from 'immutable'

import Loading from '../common/loading'
import request from '../utils/request'
import { dataLayer, defaultMapStyle } from './map-style'
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends Component {
  state = {
    mapStyle: defaultMapStyle,
    stations: JSON.parse(localStorage.getItem('stations')),
    stationGeoJSON: JSON.parse(localStorage.getItem('stationGeoJSON')),
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  }

  componentDidMount() {
    console.log(this.state.stations)
    // if (!this.state.stations) {
    request(`/stations`)
      .then(stations => {
        localStorage.setItem('stations', JSON.stringify(stations))
        this.buildGeoJSON(stations.stations)
      })
      .catch(error => {
        console.log(error)
      })
    // }
  }

  buildGeoJSON(stations) {
    const geoJSON = GeoJSON.parse(stations, {
      Point: ['location.latitude', 'location.longitude'],
      include: ['name', 'id'],
    })

    console.log(geoJSON)

    this.setState({ stationGeoJSON: geoJSON })
    localStorage.setItem('stationGeoJSON', JSON.stringify(geoJSON))

    // this.buildMapDataLayer(geoJSON)
  }
  //
  // buildMapDataLayer(geoJSON) {
  //   const mapStyle = defaultMapStyle
  //     .setIn(['sources', 'stationList'], fromJS({cluster: true, clusterMaxZoom: 14, clusterRadius: 40, type: 'geojson', data: geoJSON}))
  //     .set('layers', defaultMapStyle.get('layers').push(dataLayer))
  //
  //     console.log(JSON.stringify(mapStyle))
  //
  //   this.setState({ mapStyle })
  // }

  _stationMarker = station => {
    return (
      <Marker
        key={`station-{$station.id}`}
        longitude={station.location.longitude}
        latitude={station.location.latitude}
      />
    )
  }

  render() {
    const { stations, mapStyle, viewport } = this.state

    if (!stations) {
      return <Loading />
    }

    return (
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {stations.stations.map(station => {
          this._stationMarker(station)
        })}
      </ReactMapGL>
    )
  }
}

export default Map
