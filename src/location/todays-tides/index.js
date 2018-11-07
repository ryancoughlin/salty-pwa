import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import moment from 'moment'
import TodayTideRow from './today-tide-row'
import UI from '../../assets/ui'
import Icon from '../../common/icon'

const TodaysTides = ({ tides, nearbyStations }) => (
  <Container>
    <InnerContainer>
      <Header>
        <IconContainer>
          <Icon.Tide />
        </IconContainer>
        <UI.Type.SecondaryHeader>Today's Tides</UI.Type.SecondaryHeader>
      </Header>
      <ViewTideTable to="/tables">View tides</ViewTideTable>
    </InnerContainer>

    {findTodaysTides(tides).map(tide => (
      <TodayTideRow tide={tide} key={tide.time} />
    ))}
  </Container>
)

const findTodaysTides = tides => {
  const now = moment()
  const todaysKey = now.format('MM/DD/YYYY')
  return tides[todaysKey]
}

const InnerContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between',
})

const Header = glamorous.div({
  display: 'flex',
})

const IconContainer = glamorous.div({
  marginRight: 16,
})

const ViewTideTable = glamorous(Link)({
  fontSize: 16,
  fontWeight: '500',
  color: UI.Colors.Primary,
  ':visited': {
    color: UI.Colors.Primary,
  },
})

const Container = glamorous.div({
  marginTop: 20,
  marginBottom: UI.Spacing.Default,
})

export default TodaysTides
