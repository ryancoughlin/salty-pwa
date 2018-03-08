import React, { Component } from 'react'
import glamorous from 'glamorous'
import StationMap from './station-map'
import Loading from '../../common/loading'
import request from '../../utils/request'
import Styles from '../../assets/styles'

class StationInformation extends Component {
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
        <StationMap />
      </Container>
    )
  }
}

const Container = glamorous(Styles.Containers.Card)({
  padding: 0,
  overflow: 'hidden',
})

export default StationInformation
