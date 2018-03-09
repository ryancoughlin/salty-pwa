import React, { Component } from 'react'
import glamorous from 'glamorous'
import StationMap from './station-map'
import Loading from '../../common/loading'
import request from '../../utils/request'
import Styles from '../../assets/styles'

class StationInformation extends Component {
  state = {
    nearbyStations: JSON.parse(localStorage.getItem('nearbyStations')) || [],
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.location

    request(
      `/nearby-stations?latitude=${latitude}&longitude=${longitude}`,
    ).then(nearbyStations => {
      this.setState({ nearbyStations })
      localStorage.setItem('nearbyStations', JSON.stringify(nearbyStations))
    })
  }

  render() {
    const { nearbyStations } = this.state
    if (!nearbyStations) return <Loading />

    return (
      <Container>
        <StationMap
          stations={nearbyStations}
          userLocation={this.props.userLocation}
        />
      </Container>
    )
  }
}

const Container = glamorous(Styles.Containers.Card)({
  padding: 0,
  overflow: 'hidden',
})

export default StationInformation
