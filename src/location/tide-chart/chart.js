import React, { Component } from 'react'
import {
  VictoryLine,
  VictoryChart,
  VictoryClipContainer,
  VictoryZoomContainer,
  VictoryAxis,
  VictoryScatter,
} from 'victory'
import moment from 'moment'
import glamorous from 'glamorous'
import UI from '../../assets/ui'
import Marker from './marker'

const AXIS_FONT_SIZE = 10

const now = moment(new Date()).add(-6, 'hours')
const tomorrow = moment(new Date()).add(1, 'days').add(-8, 'hours')

export default class TideChart extends Component {
  get tides() {
    const { tides } = this.props

    const values = Object.values(tides)
    const flatTides = values.flat()

    return flatTides.map((prediction) => ({
      ...prediction,
      time: moment(prediction.time),
    }))
  }

  render() {
    return (
      <Container>
        <VictoryChart
          containerComponent={
            <VictoryZoomContainer
              clipContainerComponent={
                <VictoryClipContainer clipPadding={{ top: 34 }} />
              }
              zoomDomain={{ x: [now, tomorrow] }}
              allowZoom={false}
              dimension="x"
            />
          }
          height={200}
          padding={{
            top: 30,
            right: 10,
            bottom: 32,
            left: 30,
          }}
        >
          <VictoryAxis
            dependentAxis
            tickValues={[-2, 0, 2, 4, 6, 8, 10]}
            orientation="left"
            scale="linear"
            style={{
              axis: { stroke: 'transparent' },
              grid: {
                stroke: '#eaeaea',
                strokeDasharray: 10,
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
    )
  }
}

const Container = glamorous.div({
  marginLeft: 24,
  marginBottom: 24,
})
