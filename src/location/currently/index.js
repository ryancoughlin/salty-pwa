import React, { Component } from 'react'
import glamorous from 'glamorous'
import UI from '../../assets/ui'
import ConditionRow from '../../common/condition-row'
import { shortTimeFormat } from '../../utils/helpers'

class Currently extends Component {
  render() {
    const { weather } = this.props

    return (
      <Container>
        <Header>Current Conditions</Header>
        <Summary>{weather.summary}</Summary>
        <Details>
          <ConditionRow
            label={'Sunrise'}
            value={shortTimeFormat(weather.sunrise)}
          />
          <ConditionRow
            label={'Sunset'}
            value={shortTimeFormat(weather.sunset)}
          />
          <ConditionRow label={'Pressure'} value={`${weather.pressure} mb`} />
          <ConditionRow label={'Moon'} value={weather.moon.phase} />
          <ConditionRow label={'Humidity'} value={`${weather.humidity}%`} />
          <ConditionRow label={'UV Index'} value={`${weather.uvIndex} / 10`} />
          <ConditionRow
            label={'Visibility'}
            value={`${weather.visibility} mi`}
          />
        </Details>
      </Container>
    )
  }
}

const Container = glamorous(UI.Container.Base)({
  backgroundColor: UI.Colors.DarkBackground,
})

const Details = glamorous.div({
  marginTop: UI.Spacing.Default,
  borderTopStyle: 'solid',
  borderTopWidth: 1,
  borderTopColor: 'rgba(255, 255, 255, 0.06)',
})

const Header = glamorous(UI.Type.SecondaryHeader)({
  color: 'white',
})

const Summary = glamorous(UI.Type.TextMedium)({
  color: UI.Colors.SubtleTextColor,
  fontWeight: 'normal',
  paddingRight: 32,
})

export default Currently
