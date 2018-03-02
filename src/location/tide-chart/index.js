import React, { Component } from 'react'
import glamorous from 'glamorous'
import Chart from './chart'
import Loading from '../../common/loading'
import ChartHeader from '../../common/chart-header'
import request from '../../utils/request'
import Styles from '../../assets/styles'

class TideChart extends Component {
  state = {
    tideChart: JSON.parse(localStorage.getItem('tideChart')),
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.location

    request(`/tide-chart?latitude=${latitude}&longitude=${longitude}`).then(
      tideChart => {
        this.setState({ tideChart: tideChart })
        localStorage.setItem('tideChart', JSON.stringify(tideChart))
      },
    )
  }

  render() {
    const { tideChart } = this.state
    if (!tideChart) return <Loading />

    return (
      <Container>
        <ChartHeader
          headerText={'Water Levels'}
          bodyText={'Over the next 24 hours'}
        />
        <Chart tideChart={tideChart} />
      </Container>
    )
  }
}

const Container = glamorous.div({
  padding: Styles.Spacing.baseSpacing,
  marginBottom: Styles.Spacing.baseSpacing,
  borderRadius: 6,
  boxShadow: '0 0 20px 0 rgba(3, 23, 44, 0.12)',
})

export default TideChart
