import moment from 'moment';

export function shortTimeFormat(time) {
  return moment(time).format('hh:mma');
}
