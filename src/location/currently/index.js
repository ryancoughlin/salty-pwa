import React, { Component } from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import UI from '../../assets/ui'
import ConditionRow from '../../common/condition-row'
import { shortTimeFormat } from '../../utils/helpers'

class CurrentConditions extends Component {
  render() {
    const { weather } = this.props

    return (
      <Container>
        <Header>Current Conditions</Header>
        <Summary>{weather.summary}</Summary>
        <Details>
          <ConditionRow
            label="Sunrise"
            value={shortTimeFormat(weather.sunrise)}
          />
          <ConditionRow
            label="Sunset"
            value={shortTimeFormat(weather.sunset)}
          />
          <ConditionRow label="Pressure" value={`${weather.pressure} mb`} />
          <ConditionRow label="Moon" value={weather.moon.phase} />
          <ConditionRow label="Humidity" value={`${weather.humidity}%`} />
          <ConditionRow label="UV Index" value={`${weather.uvIndex} / 10`} />
          <ConditionRow label="Visibility" value={`${weather.visibility} mi`} />
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
})

const Header = glamorous(UI.Type.SecondaryHeader)({
  color: 'white',
})

const Summary = glamorous(UI.Type.TextMedium)({
  color: UI.Colors.SubtleTextColor,
  fontWeight: 'normal',
  paddingRight: 32,
})

const mapStateToProps = ({ data }) => ({
  location: data.location,
  weather: data.weather,
})
export default connect(mapStateToProps)(CurrentConditions)
