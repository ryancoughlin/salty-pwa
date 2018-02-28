import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Location from './location/index'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Location} />
      </Router>
    )
  }
}

export default App
