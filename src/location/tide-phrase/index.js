import React, { Component } from 'react'
import glamorous from 'glamorous'
import { geoCodeLocation } from '../../utils/location'
import Styles from '../../assets/styles'
import RemainingTideTime from './remaining-tide-time'

const TidePhrase = class extends Component {
  render() {
    const { nextTide, location } = this.props

    return (
      <Container>
        <Styles.Type.TidePhrase>
          {nextTide.type === 'high' ? 'Incoming' : 'Outgoing'}{' '}
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

const cityName = userLocation => {
  if (userLocation) {
    return geoCodeLocation(userLocation)
      .then(city => {
        this.setState({ city: city })
        return city
      })
      .catch(error => {
        console.error(error)
      })
  } else {
    return 'Loading...'
  }
}

const FadedText = glamorous.span({
  color: Styles.Colors.SubtleTextColor,
})

const Container = glamorous.div({
  flexDirection: 'row',
  marginTop: 60,
})

export default TidePhrase
