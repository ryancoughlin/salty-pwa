import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import Styles from '../../assets/styles'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`

class StationMap extends Component {
  state = {
    userLocation: JSON.parse(localStorage.getItem('userLocation')) | {},
  }

  componentDidMount() {
    const nearbyStation = this.props.stations[0]
    console.log(nearbyStation)
    const nearbyStationCoordinates = nearbyStation.location

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/snowcast/cje8m7qongh212sqss7q3yvx4',
      center: [
        nearbyStationCoordinates.coordinates[0],
        nearbyStationCoordinates.coordinates[1],
      ],
      zoom: 13,
      minZoom: 8,
      maxZoom: 13,
    })

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'selected-station',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                nearbyStationCoordinates.coordinates[0],
                nearbyStationCoordinates.coordinates[1],
              ],
            },
          },
        },
        paint: {
          'circle-color': Styles.Colors.StationPin,
          'circle-radius': 16,
          'circle-stroke-width': 5,
          'circle-stroke-color': 'rgba(62, 63, 112, 0.24)',
        },
      })

      this.map.addLayer({
        id: 'selected-station-symbol',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [
                nearbyStationCoordinates.coordinates[0],
                nearbyStationCoordinates.coordinates[1],
              ],
            },
          },
        },
        layout: {
          'icon-image': 'buoy',
          'icon-size': 0.5,
        },
      })

      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: false,
          },
        }),
      )

      this.map.setLayoutProperty('stations', 'visibility', 'none')
      this.map.setLayoutProperty('station-name', 'visibility', 'none')
    })
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    return (
      <div
        ref={el => (this.mapContainer = el)}
        style={{ width: '100%', height: '340px' }}
      />
    )
  }
}

export default StationMap
