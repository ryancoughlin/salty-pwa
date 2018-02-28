import React, { Component } from 'react'
import glamorous from 'glamorous'
import { geoCodeLocation } from '../../utils/location'
import Styles from '../../assets/styles'
import RemainingTideTime from './remaining-tide-time'

const TidePhrase = class extends Component {
  state = {
    city: '',
  }

  render() {
    const { nextTide, location } = this.props

    cityName(location)

    console.log('City is: ', this.state.city)

    return (
      <Container>
        <Styles.Type.TidePhrase>
          {nextTide.type === 'high' ? 'Incoming' : 'Outgoing'}{' '}
          <FadedText>
            Tide
            <br />in <a>{this.state.city}</a>
          </FadedText>
        </Styles.Type.TidePhrase>
        <RemainingTideTime nextTide={nextTide} />
      </Container>
    )
  }
}

const cityName = userLocation => {
  if (userLocation) {
    console.log('Start to geocode')
    geoCodeLocation(userLocation)
      .then(city => {
        console.log(city)
        this.setState({ city: city })
      })
      .catch(error => {
        console.error(error)
      })
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
