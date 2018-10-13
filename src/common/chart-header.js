import React from 'react'
import glamorous from 'glamorous'
import UI from '../assets/ui'

const ChartHeader = ({ headerText, bodyText }) => (
  <Container>
    <UI.Type.SecondaryHeader>{headerText}</UI.Type.SecondaryHeader>
    <Byline>{bodyText}</Byline>
  </Container>
)

const Container = glamorous.div({
  marginBottom: UI.Spacing.Default,
})

const Byline = glamorous(UI.Type.TextMedium)({
  fontWeight: 'normal',
  color: UI.Colors.SubtleTextColor,
})

export default ChartHeader
