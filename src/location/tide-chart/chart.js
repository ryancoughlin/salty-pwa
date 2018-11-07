import React, { Component } from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryContainer,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import moment from 'moment';
import glamorous from 'glamorous';
import UI from '../../assets/ui';

const AXIS_FONT_SIZE = 14;

export default class TideChart extends Component {
  get tides() {
    const today = moment().format('MM/DD/YYYY');
    const todaysTides = this.props.tideChart[today];
    return todaysTides.map(prediction => ({
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
          height={170}
          padding={{
            top: 5,
            right: 10,
            bottom: 24,
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
            interpolation="basis"
            x="time"
            y="height"
            scale={{ x: 'time' }}
            style={{
              data: {
                stroke: UI.Colors.Primary,
                strokeWidth: 2,
              },
            }}
          />
          <VictoryLine
            data={[{ x: new Date(), y: 0 }, { x: new Date(), y: 12 }]}
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
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  WebkitOverflowScrolling: 'touch',
});
