import React, { Component } from 'react'
import glamorous from 'glamorous'
import Icon from '../../common/icon'
import Styles from '../../assets/styles'
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
        <Styles.Type.Body>{weather}</Styles.Type.Body>
      </Container>
    )
  }
}

const Container = glamorous.div({
  display: 'flex',
  marginBottom: Styles.Spacing.Default,
})
