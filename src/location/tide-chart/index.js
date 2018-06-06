import React, { Component } from 'react'
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
      <div>
        <ChartHeader
          headerText={'Water Levels'}
          bodyText={'Over the next 24 hours'}
        />
        <Chart tideChart={tideChart} />
      </div>
    )
  }
}

export default TideChart
