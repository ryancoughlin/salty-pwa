import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import findNextTide from '../utils/find-next-tide'
import Loading from '../common/loading'
import TidePhrase from './tide-phrase'
import Currently from './currently'
import CurrentWeather from './current-weather'
import TodaysTides from './todays-tides'
import Swell from './swell'
import StationInformation from './station-information'
import TideChart from './tide-chart'
import UI from '../assets/styles'

class Location extends Component {
  componentDidMount() {
    this.props.fetchLocation()
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, {
      extra: info,
    })

    // eslint-disable-next-line
    Raven.setExtraContext({
      props: this.props,
      location: this.props.location,
    })
  }

  get nextTide() {
    return findNextTide(this.props.tides)
  }

  render() {
    const { tides, weather, location } = this.props

    if (!tides || !weather || !location) {
      return <Loading />
    }

    return (
      <div className={'container'}>
        <UI.Containers.Base>
          <TidePhrase location={location} nextTide={this.nextTide} />
          <CurrentWeather weather={weather} />
          <TodaysTides tides={tides} />
          <TideChart location={location} />
        </UI.Containers.Base>
        <Currently location={location} weather={weather} />
        <Swell weather={weather} />
        <StationInformation />
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  location: data.location,
  tides: data.tides,
  weather: data.weather,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Location)
