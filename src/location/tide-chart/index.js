import React, { Component } from 'react'
import glamorous from 'glamorous'
import Chart from './chart'
import Loading from '../../common/loading'
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
        if (Object.keys(tideChart).length === 0) {
          console.log('empty tide response')
        } else {
          this.setState({ tideChart: tideChart })
          localStorage.setItem('tideChart', JSON.stringify(tideChart))
        }

        // eslint-disable-next-line
        Raven.setExtraContext({ tideChart })
      },
    )
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, {
      extra: info,
    })

    // eslint-disable-next-line
    Raven.setExtraContext({
      state: this.state,
      location: this.props.location,
    })
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
  marginBottom: Styles.Spacing.Default,
})

export default TideChart
