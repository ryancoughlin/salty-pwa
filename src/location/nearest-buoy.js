import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import UI from '../assets/ui'
import Icon from '../common/icon'

const NearestBuoyText = ({ nearbyStations }) => (
  <Container>
    <SmallText>
      <Icon.Info size="8" />
      Nearest buoy is&nbsp;
      <ViewNearestBuoyLink to="/nearest-buoy">
        {nearbyStations[0].name}
      </ViewNearestBuoyLink>
    </SmallText>
  </Container>
)

const Container = glamorous.div({
  marginTop: 16,
})

const SmallText = glamorous(UI.Type.Text)({
  fontSize: 12,
  fontWeight: '500',
  marginLeft: 32,
})

const ViewNearestBuoyLink = glamorous(Link)({
  color: UI.Colors.BaseTextColor,
  textDecoration: 'underline',
  ':visited': {
    color: UI.Colors.BaseTextColor,
  },
})

export default NearestBuoyText
