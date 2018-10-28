import React from 'react'
import styled from 'react-emotion'
import SVGInline from 'react-svg-inline'

import info from '../assets/images/info.svg'
import tide from '../assets/images/tide.svg'
import sun from '../assets/images/weather/sunny.svg'
import partlySunny from '../assets/images/weather/partly-sunny.svg'
import cloudy from '../assets/images/weather/cloudy.svg'
import rain from '../assets/images/weather/rainy.svg'
import wind from '../assets/images/weather/wind.svg'
import fog from '../assets/images/weather/foggy.svg'
import snow from '../assets/images/weather/snow.svg'

const SVG = styled(SVGInline)(
  {
    position: 'relative',
    marginRight: 16,
  },
  props => ({
    svg: {
      height: props.size || 20,
      width: props.size || 20,
    },
  }),
)

export default function Icon({ name, alt, ...props }) {
  return <SVG svg={name} alt={alt} {...props} />
}

const createIcon = (src, alt) => props => (
  <Icon {...props} name={src} alt={alt} />
)

Icon.Tide = createIcon(tide, 'Tide')
Icon.Info = createIcon(info, 'Info')
Icon.Sun = createIcon(sun, 'Sun')
Icon.PartlySunny = createIcon(partlySunny, 'PartlySunny')
Icon.Cloudy = createIcon(cloudy, 'Cloudy')
Icon.Rain = createIcon(rain, 'Rain')
Icon.Wind = createIcon(wind, 'Wind')
Icon.Fog = createIcon(fog, 'Fog')
Icon.Snow = createIcon(snow, 'Snow')
