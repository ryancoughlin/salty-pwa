import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import glamorous from 'glamorous';
import { shortTimeFormat } from '../../utils/helpers';
import UI from '../../assets/ui';

const formatTideHeight = height => `${height.toFixed(1)}'`;

const isPastTide = (time) => {
  const now = moment();

  if (moment(time).diff(now, 'minutes') < 0) {
    return true;
  }
};

const TideRow = ({ tide }) => (
  <Container pastTide={isPastTide(tide.time)}>
    <TideType>{_.upperFirst(tide.type)}</TideType>
    <UI.Type.Time>
      {shortTimeFormat(tide.time)}
      /
      {formatTideHeight(tide.height)}
    </UI.Type.Time>
  </Container>
);

const Container = glamorous.div(
  {
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
    ':last-of-type': {
      marginBottom: 0,
    },
  },
  props => ({
    textDecoration: props.pastTide ? 'line-through' : 'none',
    opacity: props.pastTide ? '0.3' : '1',
  }),
);

const TideType = glamorous(UI.Type.TextMedium)({
  minWidth: 54,
});

export default TideRow;
