import React, { Component } from 'react'
import glamorous from 'glamorous'
import { geoCodeLocation } from '../../utils/location'
import Styles from '../../assets/styles'
import RemainingTideTime from './remaining-tide-time'

const TidePhrase = class extends Component {
  constructor(props) {
    super(props)

    console.log('State inside of tide phrase', props.location)

    this.state = {
      location: props.location,
    }
  }

  render() {
    const { nextTide } = this.props
    const { location } = this.state

    return (
      <Container>
        <Styles.Type.TidePhrase>
          {tideDirection(nextTide)}{' '}
          <FadedText>
            Tide
            <br />in <a>{cityName(location)}</a>
          </FadedText>
        </Styles.Type.TidePhrase>
        <RemainingTideTime nextTide={nextTide} />
      </Container>
    )
  }
}

const cityName = location => {
  geoCodeLocation(location)
    .then(response => {
      console.log(response)

      return 'foo'
    })
    .catch(error => {
      console.error(error)
    })
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
