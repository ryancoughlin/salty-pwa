import React from 'react'
import glamorous from 'glamorous'
import UI from '../assets/styles'

const TideArrow = props => {
  return props.direction === 'high' ? (
    <Arrow {...props}>↑</Arrow>
  ) : (
    <Arrow {...props}>↓</Arrow>
  )
}

const Arrow = glamorous(UI.Type.Body)(
  {
    color: UI.Colors.Primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: UI.Spacing.smallSpacing,
  },
  props => {
    if (props.tidePhrase) {
      return { fontSize: 18, position: 'relative', top: 12, left: 5 }
    } else {
      return null
    }
  },
)

export default TideArrow
