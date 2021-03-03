import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Raven from 'raven-js'
import * as actions from '../../actions'
import findNextTide from '../../utils/find-next-tide'
import RemainingTideTime from './remaining-tide-time'
import LocationName from './location-name'
import TideDirection from './tide-direction'
import NearestBuoy from './nearest-buoy'
import styled from '@emotion/styled'
import LocationLoader from '../../common/loaders/location.loader'

const Overview = class extends Component {
  get nextTide() {
    return findNextTide(this.props.tides)
  }

  componentDidCatch(error, info) {
    Raven.captureException(error, {
      extra: info,
      props: { ...this.props },
    })
  }

  render() {
    const { locationName, nearbyStations } = this.props
    return (
      <Container>
        {location && this.nextTide ? (
          <LocationLoader />
        ) : (
          <div>
            <LocationName locationName={locationName} />
            <TideDirection nextTide={this.nextTide} />
            <RemainingTideTime nextTide={this.nextTide} />
          </div>
        )}
      </Container>
    )
  }
}

const Container = styled.div`
  background-color: #fff;
`

const mapStateToProps = ({ data }) => ({
  locationName: data.locationName,
  location: data.location,
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
