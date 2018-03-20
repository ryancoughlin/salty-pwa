import React, { Component } from 'react'
import glamorous from 'glamorous'
import StationMap from './station-map'
import Loading from '../../common/loading'
import request from '../../utils/request'
import { fetchLocation } from '../../utils/location'
import Styles from '../../assets/styles'

class StationInformation extends Component {
  state = {
    nearbyStations: JSON.parse(localStorage.getItem('nearbyStations')) || [],
  }

  componentDidMount() {
    fetchLocation().then(location => {
      const { latitude, longitude } = location

      request(
        `/nearby-stations?latitude=${latitude}&longitude=${longitude}`,
      ).then(nearbyStations => {
        this.setState({ nearbyStations })
        localStorage.setItem('nearbyStations', JSON.stringify(nearbyStations))
      })
    })
  }

  render() {
    const { nearbyStations } = this.state
    if (!nearbyStations || nearbyStations.length === 0) return <Loading />

    return (
      <Container>
        <StationMap stations={nearbyStations} />
      </Container>
    )
  }
}

const Container = glamorous(Styles.Containers.Card)({
  padding: 0,
  overflow: 'hidden',
})

export default StationInformation
