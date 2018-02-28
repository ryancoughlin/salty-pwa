import React from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'

const TideArrow = direction => {
  return findDirection(direction)
}

const findDirection = ({ direction }) => {
  if (direction === 'high') {
    return <Arrow>↑</Arrow>
  } else {
    return <Arrow>↓</Arrow>
  }
}

const Arrow = glamorous(Styles.Type.Body)({
  color: Styles.Colors.Primary,
  fontSize: 14,
  fontWeight: 'bold',
  marginRight: Styles.Spacing.smallSpacing,
})

export default TideArrow
