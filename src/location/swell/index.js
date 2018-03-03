import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import glamorous from 'glamorous'
import SwellChart from './chart'
import Loading from '../../common/loading'
import Styles from '../../assets/styles'
import request from '../../utils/request'

const Swell = class extends Component {
  state = {
    type: '',
    direction: '',
    period: '',
    swell: JSON.parse(localStorage.getItem('swell')),
    requestSuccess: false,
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.location

    this.findCurrentSwell(this.state.swell)

    request(`/swell?latitude=${latitude}&longitude=${longitude}`).then(
      swell => {
        this.setState({ swell: swell, requestSuccess: true })
        localStorage.setItem('swell', JSON.stringify(swell))
      },
    )
  }

  findCurrentSwell() {
    const now = moment()
    const swellForecast = _.flatMap(this.state.swell)

    const currentSwellIndex = _.findIndex(swellForecast, swell => {
      const time = moment.utc(swell.time).local()
      console.log(now.diff(time), swell)
      return now.diff(time) <= 0
    })

    const currentSwell = swellForecast[currentSwellIndex]

    console.log(currentSwell, currentSwellIndex)

    if (currentSwell) {
      this.setState({
        type: currentSwell.type,
        compassDirection: currentSwell.compassDirection,
        direction: currentSwell.direction,
        height: currentSwell.height,
        period: currentSwell.period,
      })
    }
  }

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  render() {
    const {
      type,
      period,
      compassDirection,
      height,
      requestSuccess,
    } = this.state

    if (!requestSuccess) {
      return (
        <Container>
          <Loading />
        </Container>
      )
    }

    return (
      <Container>
        <SwellHeight>{height}&apos;</SwellHeight>
        <Headline>{type}</Headline>
        <SwellPeriod>
          Swell period at {period}s from {compassDirection}
        </SwellPeriod>
        <SwellChart swell={this.state.swell} />
      </Container>
    )
  }
}

const Container = glamorous.div({
  backgroundImage: 'linear-gradient(-190deg, #8ADFFF 0%, #52BBFF 98%)',
  backgroundColor: Styles.Colors.Primary,
  boxShadow: '0 0 20px 0 rgba(3, 23, 44, 0.14)',
  padding: Styles.Spacing.baseSpacing,
  marginBottom: Styles.Spacing.baseSpacing,
  borderRadius: 6,
})

const SwellHeight = glamorous(Styles.Type.SecondaryHeader)({
  color: Styles.Colors.SwellBlue,
  fontSize: 28,
  fontWeight: '500',
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
