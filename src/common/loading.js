import React from 'react'
import glamorous from 'glamorous'
import { css } from 'glamor'
import Styles from '../assets/styles'

const Loading = () => (
  <Container>
    <Bar />
    <Bar />
    <Bar />
    <Bar />
    <Bar />
  </Container>
)

const scaleAnimation = css.keyframes({
  '0%': {
    transform: 'scale3d(1, 1, 1)',
  },
  '50%': {
    transform: 'scale3d(0.4, 0.4, 0.4)',
  },
  '100%': {
    transform: 'scale3d(1, 1, 1)',
  },
})

const Container = glamorous.div({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
})

const Bar = glamorous.div({
  backgroundColor: Styles.Colors.Primary,
  width: 2,
  height: 16,
  borderRadius: 3,
  margin: 1,
  animationFillMode: 'both',
  display: 'inline-block',
  animation: `${scaleAnimation} 1.5s -0.9s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85)`,
  ':nth-child(2)': {
    animationDelay: '-0.4s',
  },
  ':nth-child(4)': {
    animationDelay: '-0.4s',
  },
  ':nth-child(1)': {
    animationDelay: '-0.2s',
  },
  ':nth-child(5)': {
    animationDelay: '-0.2s',
  },
})

export default Loading
