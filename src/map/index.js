import React, { Component } from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        style={{ styles: 'mapbox://styles/snowcast/cje8m7qongh212sqss7q3yvx4' }}
        onViewportChange={viewport => this.setState({ viewport })}
      />
    )
  }
}

export default Map
