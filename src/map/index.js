import React, { Component } from 'react'
import glamorous from 'glamorous'
import { userLocation } from '../utils/location'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`

class Map extends Component {
  state = {
    userLocation: JSON.parse(localStorage.getItem('userLocation')),
  }

  componentDidMount() {
    userLocation().then(location => {
      const userLocation = [location.longitude, location.latitude]
      this.setState({ userLocation })
      localStorage.setItem('userLocation', JSON.stringify(userLocation))
    })

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/snowcast/cje8m7qongh212sqss7q3yvx4',
      center: this.state.userLocation,
      zoom: 12,
    })

    this.map.on('load', () => {
      this.map.on('click', 'stations', e => {
        var coordinates = e.features[0].geometry.coordinates.slice()
        var description = e.features[0].properties.name

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.map)
      })

      this.map.on('mouseenter', 'stations', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })

      this.map.on('mouseleave', 'stations', () => {
        this.map.getCanvas().style.cursor = ''
      })

      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: false,
          },
        }),
      )
    })
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    return (
      <div className={'container'}>
        <Map />
      </div>
    )
  }
}

export default Map
