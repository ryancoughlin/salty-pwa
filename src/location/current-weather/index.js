import React from 'react'
import glamorous from 'glamorous'
import UI from '../../assets/ui'
import CurrentWeatherRow from './current-weather-row'

const CurrentWeather = ({ weather }) => (
  <Container>
    <CurrentWeatherRow weather={weather.currentWind} icon="wind" />
    <CurrentWeatherRow weather={weather.currentWeather} icon={weather.icon} />
  </Container>
)

const Container = glamorous.div({
  marginBottom: UI.Spacing.largeSpacing,
  marginTop: UI.Spacing.largeSpacing,
})

export default CurrentWeather
