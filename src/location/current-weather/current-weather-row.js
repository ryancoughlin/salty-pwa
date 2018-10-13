import React, { Component } from 'react'
import glamorous from 'glamorous'
import Icon from '../../common/icon'
import UI from '../../assets/styles'
import weatherIcon from '../../utils/weather-icon'

export default class CurrentWeatherRow extends Component {
  get prepareIcon() {
    return weatherIcon(this.props.icon)
  }

  render() {
    const { weather } = this.props

    return (
      <Container>
        <Icon source={this.prepareIcon} />
        <UI.Type.Body>{weather}</UI.Type.Body>
      </Container>
    )
  }
}

const Container = glamorous.div({
  display: 'flex',
  marginBottom: UI.Spacing.Default,
})
