import React, { Component } from 'react'

import request from '../utils/request'
import findNextTide from '../utils/find-next-tide'
import { fetchLocation } from '../utils/location'
import Loading from '../common/loading'
import TidePhrase from './tide-phrase'
import Currently from './currently'
import CurrentWeather from './current-weather'
import TodaysTides from './todays-tides'
import Swell from './swell'
import TideChart from './tide-chart'
import Styles from '../assets/styles'

class Location extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')),
    weather: JSON.parse(localStorage.getItem('weather')),
    location: JSON.parse(localStorage.getItem('location')),
  }

  componentDidMount() {
    fetchLocation().then(location => {
      const { latitude, longitude } = location

      const coords = {
        latitude: location.latitude,
        longitude: location.longitude,
      }

      this.setState({ location: location })
      localStorage.setItem('location', JSON.stringify(coords))

      request(`/tides?latitude=${latitude}&longitude=${longitude}`).then(
        tides => {
          this.setState({ tides: tides })
          localStorage.setItem('tides', JSON.stringify(tides))
        },
      )

      request(`/weather?latitude=${latitude}&longitude=${longitude}`).then(
        weather => {
          this.setState({ weather: weather })
          localStorage.setItem('weather', JSON.stringify(weather))
        },
      )
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
        </Styles.Containers.Base>
        <Currently location={location} weather={weather} />
        <Styles.Containers.Base>
          <Swell location={location} />
          <TideChart location={location} />
        </Styles.Containers.Base>
      </div>
    )
  }
}

export default Location
