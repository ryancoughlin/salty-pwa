import sunIcon from '../assets/images/weather/sunny.svg'
import partlySunnyIcon from '../assets/images/weather/partly-sunny.svg'
import cloudyIcon from '../assets/images/weather/cloudy.svg'
import rainIcon from '../assets/images/weather/rainy.svg'
import windIcon from '../assets/images/weather/wind.svg'
import fogIcon from '../assets/images/weather/foggy.svg'
import snowIcon from '../assets/images/weather/snow.svg'

const weatherTypes = {
  'clear-day': sunIcon,
  'partly-cloudy-day': partlySunnyIcon,
  'partly-cloudy-night': partlySunnyIcon,
  wind: windIcon,
  rain: rainIcon,
  cloudy: cloudyIcon,
  fog: fogIcon,
  snow: snowIcon,
}

export default function weatherIcon(weather) {
  return weatherTypes[weather] || sunIcon
}
