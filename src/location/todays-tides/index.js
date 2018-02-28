import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import moment from 'moment'
import TodayTideRow from './today-tide-row'
import Styles from '../../assets/styles'
import Icon from '../../common/icon'
import tideIcon from '../../assets/images/tide.png'

const TodaysTides = ({ tides }) => (
  <Container>
    <InnerContainer>
      <Header>
        <Icon source={tideIcon} />
        <Styles.Type.SecondaryHeader>
          Today&apos;s Tides
        </Styles.Type.SecondaryHeader>
      </Header>
      <ViewTidesButton>
        <Link to="/tables">View tides</Link>
      </ViewTidesButton>
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

const ViewTidesButton = glamorous.a({
  fontSize: 14,
  fontWeight: '500',
  color: Styles.Colors.Primary,
})

const Container = glamorous.div({
  marginTop: 20,
  marginBottom: 40,
})

export default TodaysTides
