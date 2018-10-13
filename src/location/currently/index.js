import React, { Component } from 'react'
import glamorous from 'glamorous'
import UI from '../../assets/styles'
import ConditionRow from '../../common/condition-row'
import WaterTemperature from '../water-temperature'
import { shortTimeFormat } from '../../utils/helpers'

import Icon from '../../common/icon'
import tideIcon from '../../assets/images/weather/snow.svg'

class Currently extends Component {
  render() {
    const { weather, location } = this.props

    return (
      <Container>
        <Top>
          <Icon source={tideIcon} />
          <div>
            <Header>Current Conditions</Header>
            <Summary>{weather.summary}</Summary>
          </div>
        </Top>
        <Details>
          <WaterTemperature location={location} />
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

const Container = glamorous.div({
  backgroundColor: UI.Colors.DarkBackground,
  paddingTop: UI.Spacing.largeSpacing,
  paddingRight: UI.Spacing.Default,
  paddingBottom: UI.Spacing.Default,
  paddingLeft: UI.Spacing.smallSpacing * 2,
})

const Details = glamorous.div({
  marginTop: UI.Spacing.Default,
  marginLeft: 36,
  borderTopStyle: 'solid',
  borderTopWidth: 1,
  borderTopColor: 'rgba(255, 255, 255, 0.06)',
})

const Top = glamorous.div({
  display: 'flex',
})

const Header = glamorous(UI.Type.SecondaryHeader)({
  color: 'white',
})

const Summary = glamorous(UI.Type.TextMedium)({
  color: UI.Colors.SubtleTextColor,
  fontWeight: 'normal',
  paddingRight: 24,
})

export default Currently
