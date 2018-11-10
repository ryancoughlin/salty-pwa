import React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';
import moment from 'moment';
import TideRow from './tide-row';
import UI from '../../assets/ui';

const findTodaysTides = (tides) => {
  console.log('TCL: findTodaysTides -> tides', tides);
  const now = moment();
  const todaysKey = now.format('MM/DD/YYYY');
  return tides[todaysKey];
};

const TodaysTides = ({ tides }) => (
  <Container>
    <InnerContainer>
      <UI.Type.SecondaryHeader>Today&apos;s Tides</UI.Type.SecondaryHeader>
      <ViewTideTable to="/tables">View tides</ViewTideTable>
    </InnerContainer>

    {findTodaysTides(tides).map(tide => (
      <TideRow tide={tide} key={tide.time} />
    ))}
  </Container>
);

const InnerContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const ViewTideTable = glamorous(Link)({
  fontSize: 16,
  fontWeight: '500',
  color: UI.Colors.Primary,
  ':visited': {
    color: UI.Colors.Primary,
  },
});

const Container = glamorous.div({
  marginTop: 20,
  marginBottom: UI.Spacing.Default,
});

export default TodaysTides;
