import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Raven from 'raven-js';
import glamorous from 'glamorous';
import * as actions from '../../actions';
import OffshoreChart from './chart';
import Loading from '../../common/loading';
import WaterTemperature from '../water-temperature';
import ConditionRow from '../../common/condition-row';
import UI from '../../assets/ui';
import swellType from '../../utils/swell-type';
import { getCurrentSwell } from '../../selectors';

const Seas = class extends Component {
  componentDidMount() {
    const { fetchLocation, fetchSwells } = this.props;
    fetchLocation((location) => {
      fetchSwells(location);
    });
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, { extra: info, state: this.state })
  }

  currentWindSpeed() {
    const { wind } = this.props.weather;

    const now = moment();
    const currentWindIndex = wind.findIndex((hourly) => {
      const time = moment.utc(hourly.time).local();
      return now.diff(time) <= 0;
    });

    const windSpeed = wind[currentWindIndex].windSpeed;

    if (windSpeed === undefined) {
      return null;
    }
    return wind[currentWindIndex].windSpeed;
  }

  render() {
    const { swells, currentSwell } = this.props;
    console.log('​extends -> render -> currentSwell', currentSwell);

    return (
      <Container>
        {
          swells && currentSwell
            ? (
              <div>
                <Title>Seas</Title>
                <WaterTemperature />
                {
                  this.currentWindSpeed() && (
                    <ConditionRow
                      label="Wave Height"
                      value={`${currentSwell.height}' / ${swellType(this.currentWindSpeed())}`}
                      dark
                    />
                  )
                }
                <ConditionRow label="Period" value={`${currentSwell.period}s`} dark />
                <SeaForecastTitle>Next 24 hours</SeaForecastTitle>
                <OffshoreChart swell={swells} />
              </div>
            )
            : <Loading inline />
        }
      </Container>
    );
  }
};

const Container = glamorous(UI.Container.Base)({
  backgroundColor: '#6BCBFF',
  minHeight: '300',
});

const Title = glamorous(UI.Type.SecondaryHeader)({
  color: UI.Colors.Dark,
});

const SeaForecastTitle = glamorous(UI.Type.TextMedium)({
  marginTop: 16,
  marginBottom: 16,
  color: UI.Colors.Dark,
});

const mapStateToProps = ({ data }) => ({
  swells: data.swells,
  currentSwell: getCurrentSwell(data),
  weather: data.weather,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Seas);
