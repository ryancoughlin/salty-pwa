import data from './data'

export default function(state = {}, action) {
  return {
    data: data(state.data, action),
  }
}
