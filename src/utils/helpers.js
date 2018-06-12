import moment from 'moment'

export function shortTimeFormat(time) {
  return moment(time).format('hh:mma')
}

export function logLocalStorage() {
  return Object.keys(localStorage).reduce((obj, k) => {
    return { ...obj, [k]: localStorage.getItem(k) }
  }, {})
}
