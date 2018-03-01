import React, { Component } from 'react'
import glamorous from 'glamorous'
import { geoCodeLocation } from '../../utils/location'
import Styles from '../../assets/styles'
import RemainingTideTime from './remaining-tide-time'

const TidePhrase = class extends Component {
  state = {
    city: JSON.parse(localStorage.getItem('city')),
  }

  componentDidMount() {
    this.getCityName()
  }

  render() {
    const { nextTide } = this.props

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

  getCityName = () => {
    geoCodeLocation(this.props.location)
      .then(city => {
        this.setState({ city: city })
        localStorage.setItem('city', JSON.stringify(city))
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
