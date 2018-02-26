import React, { Component } from 'react'
import glamorous from 'glamorous'
import _ from 'lodash'

import Styles from '../../assets/styles'
import RemainingTideTime from './remaining-tide-time'

const TidePhrase = class extends Component {
  render() {
    const { city, nextTide } = this.props

    return (
      <Container>
        <Styles.Type.TidePhrase>
          {tideDirection(nextTide)}{' '}
          <FadedText>
            Tide
            <br />in <a>{city}</a>
          </FadedText>
        </Styles.Type.TidePhrase>
        <RemainingTideTime nextTide={nextTide} />
      </Container>
    )
  }
}

const tideDirection = nextTide => {
  if (nextTide.type === 'high') {
    return _.upperFirst('incoming')
  }

  return _.upperFirst('outgoing')
}

const FadedText = glamorous.span({
  color: Styles.Colors.SubtleTextColor,
})

const Container = glamorous.div({
  flexDirection: 'row',
  marginTop: 60,
})

export default TidePhrase
