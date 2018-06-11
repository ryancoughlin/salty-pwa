import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import glamorous from 'glamorous'
import SwellChart from './chart'
import Loading from '../../common/loading'
import Styles from '../../assets/styles'
import { fetchLocation } from '../../utils/location'
import request from '../../utils/request'
import { swellType } from '../../utils/swell-type'

const Swell = class extends Component {
  componentDidMount() {
    fetchLocation()
      .then(location => {
        const { longitude, latitude } = location
        request(`/swell?latitude=${latitude}&longitude=${longitude}`).then(
          swell => {
            this.setState({ swell: swell }, () => this.findCurrentSwell())
          },
        )
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line
    Raven.captureException(error, { extra: errorInfo, state: this.state })
  }

  findCurrentSwell() {
    const { swell } = this.state

    if (!swell || swell.length === 0) {
      return
    }

    const now = moment()
    const swellForecast = _.flatMap(swell)

    const currentSwellIndex = _.findIndex(swellForecast, swell => {
      const time = moment.utc(swell.time).local()
      return now.diff(time) <= 0
    })

    const currentSwell = swellForecast[currentSwellIndex]

    // eslint-disable-next-line
    Raven.context({ extra: { currentSwell: currentSwell } })

    this.setState({
      compassDirection: currentSwell.compassDirection,
      direction: currentSwell.direction,
      height: currentSwell.height,
      period: currentSwell.period,
    })
  }

  currentWindSpeed() {
    const wind = this.props.weather.wind

    const now = moment()
    const currentWindIndex = _.findIndex(wind, hourly => {
      const time = moment.utc(hourly.time).local()
      return now.diff(time) <= 0
    })

    return wind[currentWindIndex].windSpeed
  }

  render() {
    if (!this.state) {
      return (
        <Container>
          <Loading inline />
        </Container>
      )
    }

    return (
      <Container>
        <SwellHeight>{this.state.height}&apos;</SwellHeight>
        <Headline>{swellType(this.currentWindSpeed())}</Headline>
        <SwellPeriod>
          Swell period at {this.state.period}s from{' '}
          {this.state.compassDirection}
        </SwellPeriod>
        <SwellChart swell={this.state.swell} />
      </Container>
    )
  }
}

const Container = glamorous(Styles.Containers.Card)({
  backgroundImage: 'linear-gradient(-190deg, #8ADFFF 0%, #52BBFF 98%)',
  backgroundColor: Styles.Colors.Primary,
  minHeight: '202',
})

const SwellHeight = glamorous(Styles.Type.SecondaryHeader)({
  color: Styles.Colors.SwellBlue,
  fontSize: 28,
  marginBottom: 16,
})

const Headline = glamorous(Styles.Type.SecondaryHeader)({
  color: Styles.Colors.SwellBlue,
})

const SwellPeriod = glamorous(Styles.Type.SmallBody)({
  color: Styles.Colors.SwellBlue,
  fontWeight: 'normal',
  marginTop: 3,
})

export default Swell
