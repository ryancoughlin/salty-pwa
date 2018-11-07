import React, { Component } from 'react'
import glamorous from 'glamorous'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Map from './map'
import Loading from '../common/loading'
import UI from '../assets/ui'

class NearestBuoy extends Component {
  render() {
    const { nearbyStations } = this.props
    if (!nearbyStations || nearbyStations.length === 0) return <Loading />

    return (
      <Container>
        <Map stations={nearbyStations} />
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

const mapStateToProps = ({ data }) => ({
  nearbyStations: data.nearbyStations,
  location: data.location,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NearestBuoy)
