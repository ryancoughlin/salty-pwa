import React, { Component } from 'react'
import glamorous from 'glamorous'
import { geoCodeLocation } from '../../utils/location'
import Styles from '../../assets/styles'
import RemainingTideTime from './remaining-tide-time'

const TidePhrase = class extends Component {
  state = {
    city: '',
  }

  componentDidMount() {
    geoCodeLocation(location).then(response => {
      console.log(response)

      return 'foo'
    })
  }
  render() {
    const { location, nextTide } = this.props

    return (
      <Container>
        <Styles.Type.TidePhrase>
          {tideDirection(nextTide)}
          <FadedText>
            Tide
            <br />in <a>{location}</a>
          </FadedText>
        </Styles.Type.TidePhrase>
        <RemainingTideTime nextTide={nextTide} />
      </Container>
    )
  }
}

const tideDirection = nextTide => {
  if (nextTide.type === 'high') {
    return 'Incoming'
  }

  return 'Outgoing'
}

const FadedText = glamorous.span({
  color: Styles.Colors.SubtleTextColor,
})

const Container = glamorous.div({
  flexDirection: 'row',
  marginTop: 60,
})

export default TidePhrase
