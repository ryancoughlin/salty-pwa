import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import Styles from '../assets/styles'

const ModalHeader = () => (
  <Container>
    <Link to="/">
      <Close>×</Close>
    </Link>
  </Container>
)

const Container = glamorous.div({
  display: 'flex',
  height: 64,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight: Styles.Spacing.smallSpacing,
  position: 'relative',
  zIndex: 1,
})

const Close = glamorous.span({
  fontSize: 26,
  fontWeight: 'normal',
})

export default ModalHeader
