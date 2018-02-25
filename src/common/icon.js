import React from 'react'
import glamorous from 'glamorous'

const Icon = ({ source, style }) => <IconContainer src={source} />

const IconContainer = glamorous.img({
  width: 20,
  height: 20,
  marginLeft: 20,
  marginRight: 20,
})

export default Icon
