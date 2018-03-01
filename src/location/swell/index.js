import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import glamorous from 'glamorous'
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
    this.findCurrentSwell()
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

  render() {
    const { type, period, compassDirection, height } = this.state

    if (!this.state.type) {
      return null
    }

    return (
      <Container>
        <SwellHeight>{height}&apos;</SwellHeight>
        <Headline>{type}</Headline>
        <SwellPeriod>
          Swell period at {period}s from {compassDirection}
        </SwellPeriod>
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
  marginHorizontal: Styles.Spacing.baseSpacing,
  marginBottom: Styles.Spacing.baseSpacing,
  borderRadius: 6,
  backgroundColor: Styles.Colors.Primary,
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.1,
  shadowRadius: 20,
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
