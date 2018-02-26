import React, { Component } from 'react'
import './App.css'
import request from './utils/request'
import findNextTide from './utils/find-next-tide'
import { fetchLocation } from './utils/location'
import TidePhrase from './location/tide-phrase'
import CurrentWeather from './location/current-weather'
import TodaysTides from './location/todays-tides'

class App extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')),
    weather: JSON.parse(localStorage.getItem('weather')),
  }

  componentDidMount() {
    // Get user location
    // Kick of all requests
    // Save data to localStorage

    fetchLocation().then(location => {
      request(`/tides?latitude=43.3845&longitude=-70.5440`).then(tides => {
        this.setState({ tides: tides })
        localStorage.setItem('tides', JSON.stringify(tides))
      })

      request(`/weather?latitude=43.3845&longitude=-70.5440`).then(weather => {
        console.log(weather)
        this.setState({ weather: weather })
        localStorage.setItem('weather', JSON.stringify(weather))
      })
    })
  }

  // Derive your data don't save it

  get nextTide() {
    return findNextTide(this.state.tides)
  }

  render() {
    console.log(this.state)

    if (!this.state.tides) {
      return null
    }

    return (
      <div>
        {this.state.tides && (
          <TidePhrase city="Boston" nextTide={this.nextTide} />
        )}
        {this.state.weather && <CurrentWeather weather={this.state.weather} />}

        <TodaysTides tides={this.state.tides} />
      </div>
    )
  }
}

export default App
