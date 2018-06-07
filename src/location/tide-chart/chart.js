import React, { Component } from 'react'
import {
  VictoryLine,
  VictoryChart,
  VictoryContainer,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory'
import moment from 'moment'
import glamorous from 'glamorous'
import Styles from '../../assets/styles'

export default class TideChart extends Component {
  get tides() {
    return this.props.tideChart.map(tide => ({
      ...tide,
      time: new Date(tide.time),
    }))
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
            right: 24,
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
              axis: { stroke: Styles.Colors.SubtleTextColor },
              grid: {
                stroke: 'lightgrey',
                strokeWidth: 1,
                opacity: 0.9,
                strokeDasharray: '0.2em',
              },
              ticks: { stroke: Styles.Colors.SubtleTextColor, size: 4 },
              tickLabels: {
                fill: Styles.Colors.SubtleTextColor,
                fontSize: 12,
                fontFamily: 'overpass-mono',
              },
              axisLabel: {
                fill: Styles.Colors.SubtleTextColor,
                fontSize: 12,
                fontFamily: 'overpass-mono',
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            orientation="bottom"
            scale="time"
            style={{
              axis: { stroke: Styles.Colors.SubtleTextColor },
              grid: { strokeWidth: 1 },
              tickLabels: {
                fill: Styles.Colors.SubtleTextColor,
                fontSize: 12,
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
                stroke: Styles.Colors.Primary,
                strokeWidth: 2,
              },
            }}
          />
          <VictoryLine
            data={[{ x: new Date(), y: 0 }, { x: new Date(), y: 12 }]}
            labels={['NOW']}
            labelComponent={<VictoryLabel angle={90} y={44} />}
            style={{
              labels: {
                fill: Styles.Colors.Highlight,
                fontSize: 12,
              },
              data: {
                stroke: Styles.Colors.Highlight,
                strokeWidth: 2,
              },
            }}
          />
        </VictoryChart>
      </Container>
    )
  }
}

const Container = glamorous.div({
  width: '100%',
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  WebkitOverflowScrolling: 'touch',
})
