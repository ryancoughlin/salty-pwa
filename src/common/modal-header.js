import React from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'
import modalClose from '../assets/images/modal-close.png'

const ModalHeader = () => (
  <Container>
    <CloseModal source={modalClose} />
  </Container>
)

const Container = glamorous.div({
  height: 64,
  justifyContent: 'center',
  paddingHorizontal: Styles.Spacing.smallSpacing,
})

const CloseModal = glamorous.img({
  marginLeft: Styles.Spacing.smallSpacing,
})

export default ModalHeader
