import React, { Component } from 'react'
import glamorous from 'glamorous'
import Styles from '../assets/styles'
import moment from 'moment'

export default class extends Component {
  get formattedDate() {
    return moment(this.props.date).format('dddd, MMM D')
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
  paddingHorizontal: Styles.Spacing.Default,
  alignItems: 'flex-end',
  position: 'sticky',
  top: 0,
  backgroundColor: 'white',
})

const Header = glamorous(Styles.Type.SecondaryHeader)({
  paddingBottom: Styles.Spacing.smallSpacing,
  marginBottom: 0,
})
