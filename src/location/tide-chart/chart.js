import React, { Component } from 'react'
import {
  VictoryLine,
  VictoryChart,
  VictoryContainer,
  VictoryTheme,
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
          theme={VictoryTheme.material}
          animate={{ duration: 1000 }}
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
          <VictoryLine
            data={[{ x: new Date(), y: 0 }, { x: new Date(), y: 12 }]}
            style={{ data: { stroke: 'red' } }}
            labels={['NOW']}
            labelComponent={<VictoryLabel angle={90} y={50} />}
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
