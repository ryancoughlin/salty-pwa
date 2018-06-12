import React, { Component } from 'react'
import request from '../utils/request'
import findNextTide from '../utils/find-next-tide'
import { fetchLocation } from '../utils/location'
import { logLocalStorage } from '../utils/helpers'
import Loading from '../common/loading'
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
    tides: JSON.parse(localStorage.getItem('tides')),
    weather: JSON.parse(localStorage.getItem('weather')),
    location: JSON.parse(localStorage.getItem('location')),
  }

  componentDidMount() {
    fetchLocation()
      .then(location => {
        const coords = {
          latitude: location.latitude,
          longitude: location.longitude,
        }

        this.setState({ location: coords })
        localStorage.setItem('location', JSON.stringify(coords))

        request(
          `/tides?latitude=${coords.latitude}&longitude=${coords.longitude}`,
        )
          .then(tides => {
            this.setState({ tides: tides })
            localStorage.setItem('tides', JSON.stringify(tides))
          })
          .catch(error => {
            console.error(error)
          })

        request(
          `/weather?latitude=${coords.latitude}&longitude=${coords.longitude}`,
        )
          .then(weather => {
            this.setState({ weather: weather })
            localStorage.setItem('weather', JSON.stringify(weather))
          })
          .catch(error => {
            console.error(error)
          })
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line
    Raven.captureException(error, {
      extra: errorInfo,
      state: this.state,
      localStorage: logLocalStorage(),
    })
  }

  get nextTide() {
    return findNextTide(this.state.tides)
  }

  render() {
    const { tides, weather, location } = this.state

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

export default Location
