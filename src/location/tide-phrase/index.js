import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import geocodeLocation from '../../utils/geocode'
import Styles from '../../assets/styles'
import RemainingTideTime from './remaining-tide-time'
import TideArrow from '../../common/tide-arrow'

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
        <TideArrow direction={nextTide.direction} tidePhrase />
        <InnerContainer>
          <Styles.Type.TidePhrase>
            {nextTide.type === 'high' ? 'Incoming' : 'Outgoing'}{' '}
            <FadedText>
              Tide
              <br />in <a>{this.state.city}</a>
            </FadedText>
          </Styles.Type.TidePhrase>
          <RemainingTideTime nextTide={nextTide} />
        </InnerContainer>
      </Container>
    )
  }

  getCityName = () => {
    geocodeLocation(this.props.location)
      .then(result => {
        const cityComponents = result.results[0].address_components.filter(
          function(addr) {
            return addr.types[0] === 'locality'
              ? 1
              : addr.types[0] === 'administrative_area_level_1' ? 1 : 0
          },
        )

        const city = cityComponents[0].long_name

        this.setState({ city: city })
        localStorage.setItem('city', JSON.stringify(city))
      })
      .catch(error => {
        console.error(error)
      })
  }
}

const CityName = glamorous(Link)({
  textDecoration: 'underline',
  color: Styles.Colors.SubtleTextColor,
  ':visited': {
    color: Styles.Colors.Primary,
  },
})

const FadedText = glamorous.span({
  color: Styles.Colors.SubtleTextColor,
})

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: 60,
})

const InnerContainer = glamorous.div({
  marginLeft: 20,
})

export default TidePhrase
