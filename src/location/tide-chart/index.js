import React, { Component } from 'react'
import glamorous from 'glamorous'
import Chart from './chart'
import Loading from '../../common/loading'
import request from '../../utils/request'
import Styles from '../../assets/styles'

class TideChart extends Component {
  state = { tideChart: null }

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
        <Chart tideChart={tideChart} />
      </Container>
    )
  }
}

const Container = glamorous.div({
  padding: Styles.Spacing.smallSpacing,
  marginBottom: Styles.Spacing.baseSpacing,
  borderRadius: 6,
  boxShadow: '0 0 20px 0 rgba(3, 23, 44, 0.14)',
})

export default TideChart
