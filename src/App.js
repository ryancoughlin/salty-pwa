import React, { Component } from 'react'
import './App.css'
import request from './utils/request'
import { fetchLocation } from './utils/location'

class App extends Component {
  state = {
    tides: JSON.parse(localStorage.getItem('tides')),
  }

  componentDidMount() {
    // Get user location
    // Kick of all requests
    // Save data to localStorage

    fetchLocation().then(location => {
      console.log('Location', location)
      request(`/tides?latitude=43.3845&longitude=-70.5440`).then(json => {
        this.setState({ tides: json })
        localStorage.setItem('tides', JSON.stringify(json))
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>asdfafasfa</h1>
        <pre>{JSON.stringify(this.state.tides)}</pre>
      </div>
    )
  }
}

export default App
