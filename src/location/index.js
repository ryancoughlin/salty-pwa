import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Raven from 'raven-js';
import * as actions from '../actions';
import findNextTide from '../utils/find-next-tide';
import Loading from '../common/loading';
import Overview from './overview';
import Currently from './currently';
import TodaysTides from './todays-tides';
import Swell from './swell';
import TideChart from './tide-chart';
import UI from '../assets/ui';

class Location extends Component {
  componentDidMount() {
    this.props.fetchLocation();
  }

  get nextTide() {
    return findNextTide(this.props.tides);
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, {
      extra: info,
    });

    // eslint-disable-next-line
    Raven.setExtraContext({
      props: this.props,
      location: this.props.location,
    });
  }

  render() {
    const {
      tides, location, nearbyStations, weather,
    } = this.props;

    if (!tides || !location || !weather) {
      return <Loading />;
    }

    return (
      <div className="container">
        <UI.Container.Base>
          <Overview
            location={location}
            nextTide={this.nextTide}
            nearbyStations={nearbyStations}
          />
          <TodaysTides tides={tides} nearbyStations={nearbyStations} />
          <TideChart location={location} />
        </UI.Container.Base>
        <Swell weather={weather} />
        <Currently />
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => ({
  location: data.location,
  tides: data.tides,
  nearbyStations: data.nearbyStations,
  weather: data.weather,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Location);
