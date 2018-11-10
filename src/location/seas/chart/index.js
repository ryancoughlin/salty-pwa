import React from 'react';
import moment from 'moment';
import SwellChart from './chart';

const futureSwells = (swell) => {
  const time = moment.utc(swell.time).local();
  return moment().diff(time) <= 0;
};

const formatSwells = swell => ({ ...swell, time: new Date(swell.time) });

const formatData = (swell) => {
  const swellArray = Object.values(swell);
  const flattened = swellArray.flat();
  console.log('TCL: formatData -> flattened', flattened);
  return flattened
    .filter(futureSwells)
    .map(formatSwells)
    .slice(0, 7);
};

const SwellChartContainer = swell => (
  <SwellChart swell={formatData(swell)} />
);

export default SwellChartContainer;
