import React from 'react'
import glamorous from 'glamorous'
import Styles from '../../assets/styles'
import CurrentWeatherRow from './current-weather-row'

const CurrentWeather = ({ weather }) => (
  <Container>
    <CurrentWeatherRow weather={weather.currentWind} icon="wind" />
    <CurrentWeatherRow weather={weather.currentWeather} icon={weather.icon} />
  </Container>
)

const Container = glamorous.div({
  marginBottom: Styles.Spacing.baseSpacing,
})

export default CurrentWeather
