import { createSelector } from 'reselect';
import moment from 'moment';

const getTides = state => state.tides;
const getSwells = state => state.swells;

const now = moment();

export const getTidesState = createSelector([getTides], (tides) => {
  const tideArray = Object.values(tides);
  return tideArray.flat();
});

export const getTodaysTides = createSelector([getTides], (tides) => {
  const todaysKey = now.format('MM/DD/YYYY');
  return tides[todaysKey];
});

export const getCurrentSwell = createSelector([getSwells], (swells) => {
  const swellForecast = Object.values(swells).flat();
  const index = swellForecast.findIndex((swell) => {
    const time = moment.utc(swell.time).local();
    return now.diff(time) <= 0;
  });

  return swellForecast[index];
});
