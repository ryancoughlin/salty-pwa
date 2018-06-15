import React from 'react'
import glamorous from 'glamorous'

const Icon = ({ source, style }) => (
  <IconContainer src={source} alt={`icon-${source}`} />
)

const IconContainer = glamorous.img({
  width: 20,
  height: 20,
  marginRight: 16,
})

export default Icon
