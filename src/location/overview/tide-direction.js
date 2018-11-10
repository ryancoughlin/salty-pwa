import React, { Fragment } from 'react';
import glamorous from 'glamorous';
import UI from '../../assets/ui';
import TideArrow from '../../common/tide-arrow';

const TideDirection = ({ nextTide }) => (
  <Container>
    {
      Object.getOwnPropertyNames(nextTide).length > 0
        ? (
          <Fragment>
            <UI.Type.TideDirection>
              {nextTide.type === 'high' ? 'Incoming tide' : 'Outgoing tide'}
            </UI.Type.TideDirection>
            <TideArrow direction={nextTide.type} tideDirection />
          </Fragment>
        )
        : (
          <Fragment>
            <UI.Type.TideDirection>
              {nextTide.type === 'high' ? 'Incoming tide' : 'Outgoing tide'}
            </UI.Type.TideDirection>
          </Fragment>
        )
      }
  </Container>
);

const Container = glamorous.div({
  display: 'flex',
  marginTop: 24,
  marginBottom: 8,
});

export default TideDirection;
