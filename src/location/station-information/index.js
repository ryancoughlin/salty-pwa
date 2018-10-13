import React, { Component } from 'react'
import glamorous from 'glamorous'
import StationMap from './station-map'
import Loading from '../../common/loading'
import request from '../../utils/request'
import { userLocation } from '../../utils/location'
import UI from '../../assets/ui'

class StationInformation extends Component {
  state = {
    nearbyStations: JSON.parse(localStorage.getItem('nearbyStations')) || [],
  }

  componentDidMount() {
    userLocation().then(location => {
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
        <StationHeader>
          <NearestStationTitle>Station nearest you</NearestStationTitle>
          <UI.Type.SecondaryHeader>
            {nearbyStations[0].name}
          </UI.Type.SecondaryHeader>
        </StationHeader>
      </Container>
    )
  }
}

const Container = glamorous.div({
  padding: 0,
  overflow: 'hidden',
})

const NearestStationTitle = glamorous.div({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: 10,
  marginBottom: UI.Spacing.smallSpacing,
})

const StationHeader = glamorous.div({
  paddingLeft: UI.Spacing.Default,
  paddingTop: UI.Spacing.Default,
  paddingBottom: UI.Spacing.smallSpacing,
  backgroundColor: 'white',
})

export default StationInformation
