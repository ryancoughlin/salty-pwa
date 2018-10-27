import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import UI from '../assets/ui'
import Icon from '../common/icon'

const NearestBuoyText = ({ nearbyStations }) => (
  <Container>
    <SmallText>
      <Icon.Tide size="12" />
      Tide data from&nbsp;
      <ViewNearestBuoyLink to="/nearest-buoy">
        {nearbyStations[0].name}
      </ViewNearestBuoyLink>
    </SmallText>
  </Container>
)

const Container = glamorous.div({
  marginTop: UI.Spacing.smallSpacing,
})

const SmallText = glamorous(UI.Type.Text)({
  fontSize: 12,
  fontWeight: '500',
})

const ViewNearestBuoyLink = glamorous(Link)({
  color: UI.Colors.BaseTextColor,
  textDecoration: 'underline',
  ':visited': {
    color: UI.Colors.BaseTextColor,
  },
})

export default NearestBuoyText
