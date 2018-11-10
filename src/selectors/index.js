import { createSelector } from 'reselect';
import moment from 'moment';

const getTides = state => state.tides;

export const getTidesState = createSelector([getTides], (tides) => {
  const tideArray = Object.values(tides);
  return tideArray.flat();
});

export const getTodaysTides = createSelector([getTides], (tides) => {
  const now = moment();
  const todaysKey = now.format('MM/DD/YYYY');
  return tides[todaysKey];
});
