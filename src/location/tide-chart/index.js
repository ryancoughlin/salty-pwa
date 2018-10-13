import React, { Component } from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import Chart from './chart'
import Styles from '../../assets/styles'

class TideChart extends Component {
  componentDidCatch(error, info) {
    // eslint-disable-next-line
    Raven.captureException(error, {
      extra: info,
      props: this.props,
    })
  }

  render() {
    const { tideChart } = this.props

    return (
      <Container>
        {tideChart ? <Chart tideChart={tideChart} /> : <div>Loading...</div>}
      </Container>
    )
  }
}
const Container = glamorous.div({
  marginBottom: Styles.Spacing.Default,
})

const mapStateToProps = ({ data }) => ({
  tideChart: data.tideChart,
})

export default connect(mapStateToProps)(TideChart)
