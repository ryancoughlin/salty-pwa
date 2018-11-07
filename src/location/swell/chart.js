import React, { Component } from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryContainer,
} from 'victory'
import glamorous from 'glamorous'
import _ from 'lodash'
import moment from 'moment'
import BarSegment from '../../common/bar-segment'
import UI from '../../assets/ui'

export default class SwellChart extends Component {
  get data() {
    return _.flatMap(this.props.swell)
      .filter(hour => {
        const time = moment.utc(hour.time).local()
        return moment().diff(time) <= 0
      })
      .map(swell => ({
        ...swell,
        time: new Date(swell.time),
      }))
      .slice(0, 7)
  }

  render() {
    return (
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
            tickValues={_.map(this.data, wind => wind.time)}
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
