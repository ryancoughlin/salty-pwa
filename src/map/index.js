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

    this.map.on('load', () => {
      this.map.addSource('stations', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ stations
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: './stations.geojson',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      })

      this.map.addLayer({
        id: 'stationPoints',
        type: 'circle',
        source: 'stations',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://www.this.mapbox.com/this.mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      })

      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'stations',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      })

      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'stations',
        filter: ['!has', 'point_count'],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 6,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff',
        },
      })
    })

    this.map.on('click', 'unclustered-point', e => {
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

    this.map.on('mouseenter', 'unclustered-point', () => {
      this.map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'unclustered-point', () => {
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
