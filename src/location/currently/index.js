import React from 'react'
import { connect } from 'react-redux'
import glamorous from 'glamorous'
import UI from '../../assets/ui'
import ConditionRow from '../../common/condition-row'
import shortTimeFormat from '../../utils/helpers'
import CurrentlyLoader from '../../common/loaders/currently.loader'

function CurrentConditions(props) {
  const weather = props.weather

  return (
    <Container>
      {Object.keys(weather).length == 0 ? (
        <CurrentlyLoader />
      ) : (
        <div>
          <Header>{weather.summary}</Header>
          <Details>
            <ConditionRow
              label="Sun"
              value={`${shortTimeFormat(weather.sunrise)} → ${shortTimeFormat(
                weather.sunset,
              )}`}
            />
            <ConditionRow label="Pressure" value={`${weather.pressure} mb`} />
            <ConditionRow label="Moon" value={weather.moon.phase} />
            <ConditionRow label="Humidity" value={`${weather.humidity}%`} />
            <ConditionRow label="UV Index" value={`${weather.uvIndex} / 10`} />
            <ConditionRow
              label="Visibility"
              value={`${weather.visibility} mi`}
            />
          </Details>
        </div>
      )}
    </Container>
  )
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
