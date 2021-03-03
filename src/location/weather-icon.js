import React from 'react'
import { ReactComponent as Sun } from '../assets/images/weather/sunny.svg'
import { ReactComponent as PartlySunny } from '../assets/images/weather/partly-sunny.svg'
import { ReactComponent as Cloudy } from '../assets/images/weather/cloudy.svg'
import { ReactComponent as Rain } from '../assets/images/weather/sunny.svg'
import { ReactComponent as Wind } from '../assets/images/weather/wind.svg'
import { ReactComponent as Fog } from '../assets/images/weather/foggy.svg'
import { ReactComponent as Snow } from '../assets/images/weather/snow.svg'

const weatherTypes = {
  'clear-day': <Sun />,
  'partly-cloudy-day': <PartlySunny />,
  'partly-cloudy-night': <PartlySunny />,
  wind: <Wind />,
  rain: <Rain />,
  cloudy: <Cloudy />,
  fog: <Fog />,
  snow: <Snow />,
}

const WeatherIcon = ({ weather }) => (
  <div>{weatherTypes[weather] || <Sun />}</div>
)

export default WeatherIcon
