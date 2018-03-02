import React, { Component } from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'
import { fetchLocation } from '../utils/location'
import mapboxgl from 'mapbox-gl'
import Loading from '../common/loading'
import ModalHeader from '../common/modal-header'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_KEY}`

class Map extends Component {
  state = {
    stations: JSON.parse(localStorage.getItem('stations')),
    userLocation: JSON.parse(localStorage.getItem('userLocation')),
  }

  componentDidMount() {
    fetchLocation().then(location => {
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

    this.map.on('click', 'stations', e => {
      var coordinates = e.features[0].geometry.coordinates.slice()
      var description = e.features[0].properties.name

      // Ensure that if the this.map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      this.map.flyTo({ center: e.features[0].geometry.coordinates })

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.map)
    })

    this.map.on('mouseenter', 'stations', () => {
      this.map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'stations', () => {
      this.map.getCanvas().style.cursor = ''
    })

    // Add geolocate control to the map.
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: false,
        },
      }),
    )
  }

  componentWillUnmount() {
    this.map.remove()
  }

  render() {
    const { stations } = this.state

    return (
      <div className={'container'}>
        <ModalHeader />
        <div
          ref={el => (this.mapContainer = el)}
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>
    )
  }
}

const Container = glamorous.div({
  width: '100vw',
  height: '100vh',
})

export default Map
