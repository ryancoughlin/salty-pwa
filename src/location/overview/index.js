import React, { Component } from 'react'
import glamorous from 'glamorous'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import UI from '../../assets/ui'
import RemainingTideTime from './remaining-tide-time'
import TideArrow from '../../common/tide-arrow'
import Raven from 'raven-js'
import LocationName from './location-name'
import TideDirection from './tide-direction'
import NearestBuoy from './nearest-buoy'

const Overview = class extends Component {
  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, {
      extra: info,
      state: this.state,
      props: { ...this.props },
    })
  }

  render() {
    const { nextTide, locationName, nearbyStations } = this.props
    return (
      <Container>
        <LocationName locationName={locationName} />
        {nearbyStations.length > 0 && (
          <NearestBuoy nearbyStations={nearbyStations} />
        )}
        <TideDirection nextTide={nextTide} />
        <RemainingTideTime nextTide={nextTide} />
      </Container>
    )
  }
}

const Container = glamorous.div({})

const mapStateToProps = ({ data }) => ({
  locationName: data.locationName,
  location: data.location,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overview)
