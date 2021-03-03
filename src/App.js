import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store'
import Location from './location/index'
import TideTables from './tide-tables/index'
import NearestBuoy from './nearest-buoy'
import Loading from './common/loading'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <Route exact path="/" component={Location} />
        <Route exact path="/tables" component={TideTables} />
        <Route exact path="/nearest-buoy" component={NearestBuoy} />
      </Router>
    </PersistGate>
  </Provider>
)

export default App
