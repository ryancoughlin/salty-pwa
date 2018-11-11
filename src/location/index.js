import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Raven from 'raven-js';
import * as actions from '../actions';
import { getTidesState, getTodaysTides } from '../selectors';
import Loading from '../common/loading';
import Overview from './overview';
import Currently from './currently';
import TodaysTides from './todays-tides';
import Seas from './seas';
import TideChart from './tide-chart';
import UI from '../assets/ui';

class Location extends Component {
  componentDidMount() {
    this.props.fetchLocation();
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
      tides,
      todaysTides,
      location,
      nearbyStations,
    } = this.props;

    if (!tides || !location) {
      return <Loading />;
    }

    return (
      <div className="container">
        <UI.Container.Base>
          <Overview
            location={location}
            tides={tides}
            nearbyStations={nearbyStations}
          />
          <TideChart location={location} />
        </UI.Container.Base>
        <Seas />
        <Currently />
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => ({
  location: data.location,
  tides: getTidesState(data),
  todaysTides: getTodaysTides(data),
  nearbyStations: data.nearbyStations,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Location);
