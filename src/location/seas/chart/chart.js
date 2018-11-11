import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryContainer,
} from 'victory';
import glamorous from 'glamorous';
import BarSegment from '../../../common/bar-segment';
import UI from '../../../assets/ui';

const OffshoreChart = ({ swell }) => (
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
        data={swell}
        labels={datum => `${datum.y}'`}
        labelComponent={
          <VictoryLabel dx={4} dy={-3} text={datum => `${datum.y}'`} />
            }
        style={{
          labels: {
            fontSize: 16,
            fontFamily: 'overpass-mono',
            fill: UI.Colors.Dark,
          },
        }}
      />
      <VictoryAxis
        scale={{ x: 'time' }}
        offsetY={16}
        tickValues={swell.map(wind => wind.time)}
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

export default OffshoreChart;
