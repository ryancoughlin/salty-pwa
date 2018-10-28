import React, { Component } from 'react'
import glamorous from 'glamorous'
import UI from '../../assets/ui'

export default class CurrentWeatherRow extends Component {
  render() {
    const { weather, icon } = this.props

    return (
      <Container>
        {icon}
        <UI.Type.Body>{weather}</UI.Type.Body>
      </Container>
    )
  }
}

const Container = glamorous.div({
  display: 'flex',
  marginBottom: UI.Spacing.Default,
})
