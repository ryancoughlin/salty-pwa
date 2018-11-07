import React, { Component } from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryContainer,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
} from 'victory';
import moment from 'moment';
import _ from 'lodash';
import glamorous from 'glamorous';
import UI from '../../assets/ui';
import Marker from './marker';

const AXIS_FONT_SIZE = 14;

export default class TideChart extends Component {
  get tides() {
    const { tides } = this.props;

    const today = moment().format('MM/DD/YYYY');

    const yesterday = moment().add(-1, 'days').format('MM/DD/YYYY');
    const lastTideYesterday = _.last(tides[yesterday]);

    const tomorrow = moment().add(1, 'days').format('MM/DD/YYYY');
    const firstTideTomorrow = _.first(tides[tomorrow]);

    const todaysTides = this.props.tides[today];
    const chartData = _.concat(lastTideYesterday, todaysTides, firstTideTomorrow);

    return chartData.map(prediction => ({
      ...prediction,
      time: moment(prediction.time),
    }));
  }

  render() {
    return (
      <Container>
        <VictoryChart
          animate={{ duration: 1000 }}
          containerComponent={<VictoryContainer />}
          domainPadding={{ y: [10, 16] }}
          height={170}
          padding={{
            top: 5,
            right: 10,
            bottom: 16,
            left: 30,
          }}
          scale={{ x: 'time', y: 'linear' }}
        >
          <VictoryAxis
            dependentAxis
            orientation="left"
            scale="linear"
            style={{
              axis: { stroke: UI.Colors.SubtleTextColor },
              grid: {
                stroke: 'lightgrey',
                strokeWidth: 1,
                opacity: 0.9,
                strokeDasharray: '0.2em',
              },
              ticks: { stroke: UI.Colors.SubtleTextColor, size: 4 },
              tickLabels: {
                fill: UI.Colors.SubtleTextColor,
                fontSize: AXIS_FONT_SIZE,
                fontFamily: 'overpass-mono',
              },
              axisLabel: {
                fill: UI.Colors.SubtleTextColor,
                fontSize: AXIS_FONT_SIZE,
                fontFamily: 'overpass-mono',
              },
            }}
          />
          <VictoryAxis
            orientation="bottom"
            scale="time"
            style={{
              axis: { stroke: UI.Colors.SubtleTextColor },
              grid: { strokeWidth: 1 },
              tickLabels: {
                fill: UI.Colors.SubtleTextColor,
                fontSize: AXIS_FONT_SIZE,
                fontFamily: 'overpass-mono',
              },
            }}
          />
          <VictoryLine
            data={this.tides}
            interpolation="catmullRom"
            x="time"
            y="height"
            scale={{ x: 'time' }}
            style={{
              data: {
                stroke: UI.Colors.Primary,
                strokeWidth: 3.6,
                strokeLinecap: 'round',
              },
            }}
          />
          <VictoryScatter
            dataComponent={<Marker />}
            data={this.tides}
            x="time"
            y="height"
            scale={{ x: 'time' }}
            size={10}
            style={{
              data: {
                fill: '#ffffff',
              },
            }}
          />
          <VictoryLine
            data={[{ x: new Date(), y: 0 }, { x: new Date(), y: 10 }]}
            labels={['NOW']}
            labelComponent={<VictoryLabel angle={90} y={20} />}
            style={{
              labels: {
                fill: UI.Colors.Highlight,
                fontFamily: 'overpass-mono',
                fontSize: AXIS_FONT_SIZE,
              },
              data: {
                stroke: UI.Colors.Highlight,
                strokeWidth: 2,
              },
            }}
          />
        </VictoryChart>
      </Container>
    );
  }
}

const Container = glamorous.div({
  width: '100%',
  marginTop: 40,
});
