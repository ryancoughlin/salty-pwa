import moment from 'moment'

export function shortTimeFormat(time) {
  return moment
    .utc(time)
    .local()
    .format('hh:mma')
}
