import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import Location from './location/index'
import TideTables from './tide-tables/index'

class App extends Component {
  render() {
    return (
      <Router>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route exact path="/" component={Location} />
          <Route exact path="/tables" component={TideTables} />
        </AnimatedSwitch>
      </Router>
    )
  }
}

export default App
