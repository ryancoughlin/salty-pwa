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

export default class SwellChart extends Component {
  get data() {
    return _.flatMap(this.props.swell)
      .filter(hour => {
        const time = moment.utc(hour.time).local()
        return moment().diff(time) <= 0
      })
      .map(swell => {
        return {
          ...swell,
          time: new Date(swell.time),
        }
      })
      .reverse()
  }

  render() {
    return (
      <Container>
        <VictoryChart
          containerComponent={<VictoryContainer />}
          height={120}
          padding={{
            top: 40,
            right: 24,
            bottom: 34,
            left: 24,
          }}
          scale={{ x: 'time', y: 'linear' }}
        >
          <VictoryBar
            dataComponent={<BarSegment color={'#164F75'} />}
            y="height"
            x="time"
            data={this.data}
            labels={datum => `${datum.y}'`}
            labelComponent={
              <VictoryLabel dx={2} text={datum => `${datum.y}'`} />
            }
            style={{
              labels: {
                fontSize: 14,
                fontFamily: 'overpass-mono',
                fill: '#164F75',
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
