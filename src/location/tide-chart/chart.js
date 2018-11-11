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
          containerComponent={<VictoryContainer />}
          domain={{ y: [-2, 12] }}
          domainPadding={{ x: 20, y: 10 }}
          height={180}
          padding={{
            top: 20,
            right: 10,
            bottom: 32,
            left: 30,
          }}
        >
          <VictoryAxis
            dependentAxis
            tickValues={[-4, 0, 4, 8, 12]}
            orientation="left"
            scale="linear"
            style={{
              axis: { stroke: 'transparent' },
              grid: {
                stroke: 'lightgrey',
                strokeWidth: 1,
                strokeDasharray: '10',
              },
              ticks: { stroke: 'transparent' },
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
            scale="time"
            offsetY={33}
            style={{
              axis: { stroke: UI.Colors.SubtleTextColor, strokeWidth: 1 },
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
            animate={{
              duration: 2000,
              easing: 'bounce',
            }}
            dataComponent={<Marker />}
            data={this.tides}
            x="time"
            y="height"
            scale={{ x: 'time' }}
            size={10}
          />
          <VictoryScatter
            data={[{ x: new Date(), y: 10 }]}
            size={6}
            style={{
              labels: {
                fill: UI.Colors.Highlight,
                fontFamily: 'overpass-mono',
                fontSize: AXIS_FONT_SIZE,
              },
              data: {
                fill: UI.Colors.Highlight,
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
