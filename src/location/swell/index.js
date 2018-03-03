import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import glamorous from 'glamorous'
import SwellChart from './chart'
import Loading from '../../common/loading'
import Styles from '../../assets/styles'

const API_DATE_FORMAT = 'MM/DD/YYYY'

const Swell = class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: null,
      direction: null,
      period: null,
    }
  }

  componentDidMount() {
    if (this.isEmpty(this.props.swells)) {
      this.findCurrentSwell()
    }
  }

  findCurrentSwell() {
    const now = moment()
    const swellForecast = _.flatMap(this.props.swell)
    const currentSwellIndex = _.findIndex(swellForecast, swell => {
      const time = moment.utc(swell.time).local()
      return now.diff(time) <= 0
    })

    const currentSwell = swellForecast[currentSwellIndex]

    this.setState({
      type: currentSwell.type,
      compassDirection: currentSwell.compassDirection,
      direction: currentSwell.direction,
      height: currentSwell.height,
      period: currentSwell.period,
    })
  }

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  render() {
    const { type, period, compassDirection, height } = this.state

    if (!type) {
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
        <SwellChart swell={this.props.swell} />
      </Container>
    )
  }
}

const Container = glamorous.div({
  backgroundImage: 'linear-gradient(-164deg, #8ADFFF 0%, #52BBFF 98%)',
  paddingRight: Styles.Spacing.smallSpacing,
  paddingTop: 14,
  paddingLeft: 40,
  paddingBottom: Styles.Spacing.smallSpacing,
  marginBottom: Styles.Spacing.baseSpacing,
  borderRadius: 6,
  backgroundColor: Styles.Colors.Primary,
  boxShadow: '0 0 20px 0 rgba(3, 23, 44, 0.14)',
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
