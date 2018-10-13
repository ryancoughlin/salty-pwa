import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import moment from 'moment'
import TodayTideRow from './today-tide-row'
import UI from '../../assets/ui'
import Icon from '../../common/icon'
import tideIcon from '../../assets/images/tide.svg'

const TodaysTides = ({ tides }) => (
  <Container>
    <InnerContainer>
      <Header>
        <Icon source={tideIcon} />
        <UI.Type.TextMedium>Today</UI.Type.TextMedium>
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
