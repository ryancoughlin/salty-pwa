import React, { Component } from 'react'
import {
  VictoryLine,
  VictoryChart,
  VictoryContainer,
  VictoryScatter,
  VictoryAxis,
} from 'victory'
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
          containerComponent={<VictoryContainer />}
          height={200}
          padding={{
            top: 24,
            right: 24,
            bottom: 24,
            left: 30,
          }}
          scale={{ x: 'time', y: 'linear' }}
        >
          <VictoryLine
            data={this.tides}
            interpolation="basis"
            x="time"
            y="height"
            scale={{ x: 'time' }}
            style={{
              data: {
                stroke: Styles.Colors.Primary,
                strokeWidth: 3,
              },
            }}
          />
          <VictoryScatter
            x="time"
            y="height"
            data={this.tides}
            labels={datum => `${datum.y}'`}
            size={5}
            style={{
              labels: {
                fontSize: 14,
                fontFamily: 'overpass-mono',
                fill: '#164F75',
              },
              data: {
                strokeWidth: 3,
                fill: Styles.Colors.Primary,
                stroke: 'white',
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
