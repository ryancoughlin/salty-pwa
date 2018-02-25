import React, { Component } from 'react'
import glamorous from 'glamorous'
import _ from 'lodash'

import Styles from '../../assets/styles'
import findNextTide from '../../utils/find-next-tide'
import RemainingTideTime from './remaining-tide-time'

const TidePhrase = class extends Component {
  render() {
    const { city, nextTide } = this.props

    return (
      <Container>
        <Styles.Type.TidePhrase>
          {tideDirection(nextTide)} Tide
          <br />in <a>{city}</a>
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

const Container = glamorous.div({
  flexDirection: 'row',
  marginVertical: Styles.Spacing.largeSpacing,
})

export default TidePhrase
