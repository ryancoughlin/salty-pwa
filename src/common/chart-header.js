import React from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'

const ChartHeader = ({ headerText, bodyText }) => (
  <Container>
    <Styles.Type.SecondaryHeader>{headerText}</Styles.Type.SecondaryHeader>
    <Byline>{bodyText}</Byline>
  </Container>
)

const Container = glamorous.div({
  marginBottom: Styles.Spacing.Default,
})

const Byline = glamorous(Styles.Type.TextMedium)({
  fontWeight: 'normal',
  color: Styles.Colors.SubtleTextColor,
})

export default ChartHeader
