import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import findNextTide from '../utils/find-next-tide'
import Loading from '../common/loading'
import Error from '../common/error'
import TidePhrase from './tide-phrase'
import Currently from './currently'
import CurrentWeather from './current-weather'
import TodaysTides from './todays-tides'
import Swell from './swell'
import StationInformation from './station-information'
import TideChart from './tide-chart'
import Styles from '../assets/styles'

class Location extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')) || null,
    weather: JSON.parse(localStorage.getItem('weather')) || null,
    location: JSON.parse(localStorage.getItem('location')) || null,
    locationError: null,
    hasLocationError: false,
  }

  componentDidMount() {
    const { location } = this.state
    this.props.fetchLocation()

    if (this.state.location) {
      this.props.fetchTides(location)
      this.props.fetchWeather(location)
    }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, {
      extra: info,
    })

    // eslint-disable-next-line
    Raven.setExtraContext({
      state: this.state,
      location: this.state.location,
    })
  }

  get nextTide() {
    return findNextTide(this.state.tides)
  }

  render() {
    const {
      tides,
      weather,
      location,
      hasLocationError,
      locationError,
    } = this.state

    if (hasLocationError) {
      return <Error error={locationError} />
    }

    if (!tides || !weather || !location) {
      return <Loading />
    }

    return (
      <div className={'container'}>
        <Styles.Containers.Base>
          <TidePhrase location={location} nextTide={this.nextTide} />
          <CurrentWeather weather={weather} />
          <TodaysTides tides={tides} />
          <TideChart location={location} />
        </Styles.Containers.Base>
        <Currently location={location} weather={weather} />
        <Styles.Containers.Base>
          <Swell weather={weather} />
        </Styles.Containers.Base>
        <StationInformation />
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  location: data.location,
  tides: data.tides,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Location)
