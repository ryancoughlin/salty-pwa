import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryContainer,
} from 'victory';
import glamorous from 'glamorous';
import moment from 'moment';
import BarSegment from '../../common/bar-segment';
import UI from '../../assets/ui';

get data() {
  const swellArray = Object.values(this.props.swell);
  const flattened = swellArray.flat();
  const futureSwells = flattened
    .filter(futureSwells)
    .map(formatSwells)
    .slice(0, 7);

  return futureSwells;
}

const futureSwells = (swell) => {
  const time = moment.utc(swell.time).local();
  return moment().diff(time) <= 0;
};

const formatSwells = swell => ({ ...swell, time: new Date(swell.time) });

const formatTicks = (data) => data.map(wind => wind.time);

const OffshoreSwellChart = ({ swell }) => (
  <Container>
    <VictoryChart
      containerComponent={<VictoryContainer />}
      height={150}
      padding={{
        top: 40,
        right: 24,
        bottom: 34,
        left: 24,
      }}
      scale={{ x: 'time', y: 'linear' }}
    >
      <VictoryBar
        dataComponent={<BarSegment color={UI.Colors.SwellBlue} />}
        y="height"
        x="time"
        data={this.data}
        labels={datum => `${datum.y}'`}
        labelComponent={
          <VictoryLabel dx={4} dy={-3} text={datum => `${datum.y}'`} />
          }
        style={{
          labels: {
            fontSize: 16,
            fontFamily: 'overpass-mono',
            fill: UI.Colors.SwellBlue,
          },
        }}
      />
      <VictoryAxis
        scale={{ x: 'time' }}
        offsetY={16}
        tickValues={formatTicks()}
        labelComponent={<VictoryLabel dx={-2} />}
        style={{
          axis: { stroke: 'transparent' },
          tickLabels: {
            fontSize: 12,
            padding: 5,
            fontFamily: 'overpass-mono',
            fill: '#164F75',
          },
        }}
      />
    </VictoryChart>
  </Container>
);

const Container = glamorous.div({
  width: '100%',
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  WebkitOverflowScrolling: 'touch',
});
export default OffshoreSwellChart;
