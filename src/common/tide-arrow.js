import React from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'

const TideArrow = props => {
  return props.direction === 'high' ? (
    <Arrow {...props}>↑</Arrow>
  ) : (
    <Arrow {...props}>↓</Arrow>
  )
}

const Arrow = glamorous(Styles.Type.Body)(
  {
    color: Styles.Colors.Primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: Styles.Spacing.smallSpacing,
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
