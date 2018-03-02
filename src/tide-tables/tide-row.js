import React, { Component } from 'react'
import glamorous from 'glamorous'

import moment from 'moment'
import Styles from '../assets/styles'
import TideArrow from '../common/tide-arrow'

export default class extends Component {
  get prettyTideTime() {
    return moment
      .utc(this.props.tide.time)
      .local()
      .format('hh:mma')
  }

  render() {
    const { tide } = this.props

    return (
      <Container>
        <Left>
          <TideArrow size={22} direction={tide.type} />
          <TideType>{tide.type}</TideType>
          <Numeric>{this.prettyTideTime}</Numeric>
        </Left>
        <Numeric>{tide.height}&apos;</Numeric>
      </Container>
    )
  }
}

const Container = glamorous.div({
  flexDirection: 'row',
  display: 'flex',
  height: 44,
  alignItems: 'center',
  justifyContent: 'space-between',
})

const Left = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
})

const TideType = glamorous(Styles.Type.SmallBody)({
  width: 52,
  textTransform: 'capitalize',
})

const Numeric = glamorous(Styles.Type.SmallNumericType)({
  textAlign: 'right',
})
