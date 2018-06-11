import moment from 'moment'

export function shortTimeFormat(time) {
  return moment(time)
    .local()
    .format('hh:mma')
}
