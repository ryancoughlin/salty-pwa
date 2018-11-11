import React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';
import UI from '../../assets/ui';

const NearestBuoyText = ({ nearbyStations }) => (
  <Container>
    <SmallText>
      Buoy:&nbsp;
      <ViewNearestBuoyLink to="/nearest-buoy">
        {nearbyStations[0].name}
      </ViewNearestBuoyLink>
    </SmallText>
  </Container>
);

const Container = glamorous.div({
  marginTop: 0,
});

const SmallText = glamorous(UI.Type.Text)({
  fontSize: 12,
  color: UI.Colors.Dark,
});

const ViewNearestBuoyLink = glamorous(Link)({
  color: UI.Colors.SubtleTextColor,
  textDecoration: 'underline',
  ':visited': {
    color: UI.Colors.SubtleTextColor,
  },
});

export default NearestBuoyText;
