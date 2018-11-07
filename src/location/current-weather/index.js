import React from 'react'
import glamorous from 'glamorous'
import UI from '../../assets/ui'
import Icon from '../../common/icon'
import CurrentWeatherRow from './current-weather-row'
import WeatherIcon from './weather-icon'

const CurrentWeather = ({ weather }) => (
  <Container>
    <CurrentWeatherRow weather={weather.currentWind} icon={<Icon.Wind />} />
    <CurrentWeatherRow
      weather={weather.currentWeather}
      icon={<WeatherIcon {...weather} />}
    />
  </Container>
)

const Container = glamorous.div({
  marginBottom: UI.Spacing.largeSpacing,
  marginTop: UI.Spacing.largeSpacing,
})

export default CurrentWeather
