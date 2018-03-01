import React, { Component } from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryZoomContainer,
} from 'victory'
import glamorous from 'glamorous'
import _ from 'lodash'

import Styles from '../../assets/styles'
import BarSegment from '../../common/bar-segment'

export default class SwellChart extends Component {
  get data() {
    return _.flatMap(this.props.swell, day =>
      _.map(day, swell => ({
        ...swell,
        time: new Date(swell.time),
      })),
    )
  }

  render() {
    return (
      <VictoryChart
        containerComponent={<VictoryZoomContainer allowZoom={false} />}
      >
        <VictoryBar
          dataComponent={<BarSegment color={'#164F75'} />}
          y="height"
          x="time"
          data={this.data}
          labels={datum => `${datum.y}'`}
          labelComponent={<VictoryLabel dx={2} text={datum => `${datum.y}'`} />}
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
          offsetY={22}
          tickValues={_.map(this.data, wind => wind.time)}
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: {
              fontSize: 10,
              padding: 5,
              fontFamily: 'overpass-mono',
              fill: '#164F75',
            },
          }}
        />
      </VictoryChart>
    )
  }
}

const Container = glamorous.div({
  overflowY: 'auto',
  overflowX: 'hidden',
})
