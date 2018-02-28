import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Location from './location/index'
import TideTables from './tide-tables/index'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Location} />
          <Route exact path="/tables" component={TideTables} />
        </div>
      </Router>
    )
  }
}

export default App
