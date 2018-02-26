import React from 'react'
import glamorous from 'glamorous'
import moment from 'moment'
import TodayTideRow from './today-tide-row'
import Styles from '../../assets/styles'
import Icon from '../../common/icon'
import tideIcon from '../../assets/images/tide.png'

const TodaysTides = ({ tides }) => (
  <Container>
    <Header>
      <Icon source={tideIcon} />
      <Styles.Type.SecondaryHeader>
        Today&apos;s Tides
      </Styles.Type.SecondaryHeader>
    </Header>
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

const Header = glamorous.div({
  display: 'flex',
})

const Container = glamorous.div({
  marginTop: 20,
  marginBottom: 40,
})

export default TodaysTides
