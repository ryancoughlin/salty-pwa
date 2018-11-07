import React, { Component } from 'react'
import glamorous from 'glamorous'
import moment from 'moment'
import UI from '../assets/ui'

export default class extends Component {
  get formattedDate() {
    const { date } = this.props
    return moment(date).format('dddd, MMM D')
  }

  render() {
    return (
      <Container>
        <Header>{this.formattedDate}</Header>
      </Container>
    )
  }
}

const Container = glamorous.div({
  display: 'flex',
  height: 70,
  paddingHorizontal: UI.Spacing.Default,
  alignItems: 'flex-end',
  position: 'sticky',
  top: 0,
  backgroundColor: 'white',
})

const Header = glamorous(UI.Type.SecondaryHeader)({
  paddingBottom: UI.Spacing.smallSpacing,
  marginBottom: 0,
})
