import moment from 'moment'
import _ from 'lodash'

export function shortTimeFormat(time) {
  return moment(time).format('hh:mma')
}

export function logLocalStorage() {
  return Object.keys(localStorage).reduce((obj, k) => {
    return { ...obj, [k]: localStorage.getItem(k) }
  }, {})
}

export function shouldFetchTides() {
  const cachedTides = JSON.parse(localStorage.getItem('tides'))

  if (cachedTides === null) {
    return true
  }

  const lastCachedTide = cachedTides[_.last(Object.keys(cachedTides))][0]
  console.log('lastCachedTide', JSON.stringify(lastCachedTide, null, 2))

  if (moment().diff(lastCachedTide.time) < 3 || null) {
    console.log('NEED TO FETCH NEW DATA!')
    return true
  }
}
