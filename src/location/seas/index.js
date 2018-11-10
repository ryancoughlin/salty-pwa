import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import glamorous from 'glamorous';
import Raven from 'raven-js';
import OffshoreSwellChart from './chart';
import Loading from '../../common/loading';
import WaterTemperature from '../water-temperature';
import ConditionRow from '../../common/condition-row';
import UI from '../../assets/ui';
import { userLocation } from '../../utils/location';
import request from '../../utils/request';
import { swellType } from '../../utils/swell-type';

const Swell = class extends Component {
  componentDidMount() {
    userLocation()
      .then((location) => {
        const { longitude, latitude } = location;
        request(`/swell?latitude=${latitude}&longitude=${longitude}`).then((swell) => {
          this.setState({ swell }, () => this.findCurrentSwell());
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, { extra: info, state: this.state })
  }

  findCurrentSwell() {
    const { swell } = this.state;

    if (!swell || swell.length === 0) {
      return;
    }

    const now = moment();
    const swellForecast = _.flatMap(swell);

    const currentSwellIndex = _.findIndex(swellForecast, (swell) => {
      const time = moment.utc(swell.time).local();
      return now.diff(time) <= 0;
    });

    const currentSwell = swellForecast[currentSwellIndex];

    // eslint-disable-next-line
    Raven.setExtraContext({ currentSwell })

    this.setState({
      compassDirection: currentSwell.compassDirection,
      direction: currentSwell.direction,
      height: currentSwell.height,
      period: currentSwell.period,
    });
  }

  currentWindSpeed() {
    const wind = this.props.weather.wind;

    const now = moment();
    const currentWindIndex = _.findIndex(wind, (hourly) => {
      const time = moment.utc(hourly.time).local();
      return now.diff(time) <= 0;
    });

    return wind[currentWindIndex].windSpeed;
  }

  render() {
    if (!this.state) {
      return (
        <Container>
          <Loading inline />
        </Container>
      );
    }

    return (
      <Container>
        <Title>Seas</Title>
        <WaterTemperature />
        <ConditionRow
          label="Wave Height"
          value={`${this.state.height}' / ${swellType(this.currentWindSpeed())}`}
          dark
        />
        <ConditionRow label="Period" value={`${this.state.period}s`} dark />
        <SeaForecastTitle>Next 24 hours</SeaForecastTitle>
        <OffshoreSwellChart swell={this.state.swell} />
      </Container>
    );
  }
};

const Container = glamorous(UI.Container.Base)({
  backgroundColor: '#6BCBFF',
  minHeight: '300',
});

const Title = glamorous(UI.Type.SecondaryHeader)({
  color: UI.Colors.SwellBlue,
});

const SeaForecastTitle = glamorous(UI.Type.TextMedium)({
  marginTop: 16,
  marginBottom: 16,
  color: UI.Colors.SwellBlue,
});

export default Swell;
