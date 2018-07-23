import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AnimatedSwitch, spring } from 'react-router-transition'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store'
import Location from './location/index'
import TideTables from './tide-tables/index'
import Map from './map/index'

const { store, persistor } = configureStore()

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `translate3d(0, ${styles.transformY}px, 0) scale3d(${
      styles.scale
    }, ${styles.scale}, 1)`,
  }
}

function zoom(val) {
  return spring(val, {
    stiffness: 130,
    damping: 15,
  })
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    transformY: -5,
    scale: 1,
  },
  atLeave: {
    opacity: 0,
    transformY: zoom(5),
    scale: zoom(0.9),
  },
  atActive: {
    opacity: 1,
    transformY: zoom(0),
    scale: zoom(1),
  },
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
              <Route exact path="/map" component={Map} />
            </AnimatedSwitch>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
