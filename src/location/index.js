import React, { Component } from 'react'

import request from '../utils/request'
import findNextTide from '../utils/find-next-tide'
import { fetchLocation } from '../utils/location'
import Loading from '../common/loading'
import TidePhrase from './tide-phrase'
import CurrentWeather from './current-weather'
import TodaysTides from './todays-tides'

class Location extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')),
    weather: JSON.parse(localStorage.getItem('weather')),
  }

  componentDidMount() {
    fetchLocation().then(location => {
      request(`/tides?latitude=43.3845&longitude=-70.5440`).then(tides => {
        this.setState({ tides: tides })
        localStorage.setItem('tides', JSON.stringify(tides))
      })

      request(`/weather?latitude=43.3845&longitude=-70.5440`).then(weather => {
        this.setState({ weather: weather })
        localStorage.setItem('weather', JSON.stringify(weather))
      })
    })
  }

  get nextTide() {
    return findNextTide(this.state.tides)
  }

  render() {
    if (!this.state.tides && !this.state.weather) {
      return <Loading />
    }

    return (
      <div className={'container'}>
        {this.state.tides && (
          <TidePhrase city="Boston" nextTide={this.nextTide} />
        )}
        {this.state.weather && <CurrentWeather weather={this.state.weather} />}

        <TodaysTides tides={this.state.tides} />
      </div>
    )
  }
}

export default Location
