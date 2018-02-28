import React from 'react'

import Icon from '../common/icon'
import downArrow from '../assets/images/low-tide-arrow.png'
import upArrow from '../assets/images/high-tide-arrow.png'

const TideArrow = direction => <Icon source={findDirection(direction)} />

const findDirection = ({ direction }) => {
  console.log(direction)
  if (direction === 'high') {
    return upArrow
  }
  return downArrow
}

export default TideArrow
