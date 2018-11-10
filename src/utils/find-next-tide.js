import moment from 'moment';

export default function findNextTide(data) {
  const tideArray = Object.values(data);
  const flattenedTides = tideArray.flat();
  const nextTideIndex = flattenedTides.findIndex((tide) => {
    const tideTime = moment(tide.time);
    return moment().diff(tideTime) <= 0;
  });

  return flattenedTides[nextTideIndex];
}
