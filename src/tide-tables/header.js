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
        <Styles.Type.SecondaryHeader>
          {this.formattedDate}
        </Styles.Type.SecondaryHeader>
      </Container>
    )
  }
}

const Container = glamorous.div({
  display: 'flex',
  height: 70,
  paddingHorizontal: Styles.Spacing.baseSpacing,
  alignItems: 'flex-end',
})
