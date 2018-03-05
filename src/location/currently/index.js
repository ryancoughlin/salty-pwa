import React, { Component } from 'react'
import glamorous from 'glamorous'
import Styles from '../../assets/styles'
import ConditionRow from './condition-row'
import WaterTemperature from '../water-temperature'
import { shortTimeFormat } from '../../utils/helpers'

import Icon from '../../common/icon'
import tideIcon from '../../assets/images/tide.png'

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
          <ConditionRow label={'UV Index'} value={`${weather.uvIndex}`} />
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
  backgroundColor: Styles.Colors.DarkBackground,
  padding: Styles.Spacing.baseSpacing,
  marginBottom: Styles.Spacing.baseSpacing,
})

const Details = glamorous.div({
  marginTop: 16,
  marginLeft: 44,
  borderTopStyle: 'solid',
  borderTopWidth: 1,
  borderTopColor: 'rgba(255, 255, 255, 0.04)',
})

const Top = glamorous.div({
  display: 'flex',
})

const Header = glamorous(Styles.Type.SecondaryHeader)({
  color: 'white',
})

const Summary = glamorous(Styles.Type.SmallBody)({
  color: Styles.Colors.SubtleTextColor,
  fontWeight: 'normal',
  paddingRight: 24,
})

export default Currently
