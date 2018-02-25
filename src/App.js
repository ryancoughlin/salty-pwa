import React, { Component } from 'react'
import './App.css'
import request from './utils/request'
import findNextTide from './utils/find-next-tide'
import { fetchLocation } from './utils/location'
import TidePhrase from './location/tide-phrase'

class App extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')),
  }

  componentDidMount() {
    // Get user location
    // Kick of all requests
    // Save data to localStorage

    fetchLocation().then(location => {
      request(`/tides?latitude=43.3845&longitude=-70.5440`).then(tides => {
        console.log(tides)
        this.setState({ tides: tides })
        localStorage.setItem('tides', JSON.stringify(tides))
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
        <TidePhrase city="Boston" nextTide={this.nextTide} />
      </div>
    )
  }
}

export default App
