import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AnimatedSwitch, spring } from 'react-router-transition'
import Location from './location/index'
import TideTables from './tide-tables/index'

function mapStyles(styles) {
  console.log(styles)
  return {
    opacity: styles.opacity,
    transform: `translate3d(0, ${styles.transformY}px, 0)`,
  }
}

function zoom(val) {
  return spring(val, {
    stiffness: 135,
    damping: 15,
  })
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    transformY: -20,
    scale: 1,
  },
  atLeave: {
    opacity: 0,
    transformY: zoom(20),
  },
  atActive: {
    opacity: 1,
    transformY: zoom(0),
  },
}

class App extends Component {
  render() {
    return (
      <Router>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
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
