import React, { Component } from 'react';
import _ from 'lodash';
import glamorous from 'glamorous';
import moment from 'moment';
import Raven from 'raven-js';
import OffshoreSwellChart from './chart';
import SeaDetails from './sea-details';
import Loading from '../../common/loading';
import UI from '../../assets/ui';
import { userLocation } from '../../utils/location';
import request from '../../utils/request';

const findCurrentSwell = (swell) => {
  const now = moment();
  const swellForecast = _.flatMap(swell);

  const currentSwellIndex = _.findIndex(swellForecast, (swell) => {
    const time = moment.utc(swell.time).local();
    return now.diff(time) <= 0;
  });

  const currentSwell = swellForecast[currentSwellIndex];

  this.setState({
    swell: {
      compassDirection: currentSwell.compassDirection,
      direction: currentSwell.direction,
      height: currentSwell.height,
      period: currentSwell.period,
    },
  });
};

const SeasContainer = class extends Component {
  componentDidMount() {
    userLocation()
      .then((location) => {
        const { longitude, latitude } = location;
        request(`/swell?latitude=${latitude}&longitude=${longitude}`)
          .then((swell) => {
            this.findCurrentSwell(swell);
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
        <SeaDetails swell={this.state.swell} />
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

export default SeasContainer;
