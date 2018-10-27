import React from 'react'
import styled from 'react-emotion'
import glamorous from 'glamorous'
import SVGInline from 'react-svg-inline'
import info from '../assets/images/info.svg'
import tide from '../assets/images/tide.svg'

console.log('TIDE', tide)

const SVG = glamorous(SVGInline)(
  {
    position: 'relative',
  },
  props => ({
    marginRight: props.marginRight || 16,
    svg: {
      height: props.size || 20,
      width: props.size || 20,
    },
  }),
  props =>
    props.hover && {
      '&:hover, &:focus': {
        'svg path, g': {
          fill: props.hover,
        },
      },
    },
)

export default function Icon({ name, alt, ...props }) {
  console.log(name)
  return <SVG svg={name} alt={alt} {...props} />
}

const createIcon = (src, alt) => props => (
  <Icon {...props} name={src} alt={alt} />
)

Icon.Tide = createIcon(tide, 'Tide')
Icon.Info = createIcon(info, 'Info')
