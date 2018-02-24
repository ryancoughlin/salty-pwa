// BASE_URL=http://104.131.10.204:3000/api
// #BASE_URL=http://localhost:3000/api
// SENTRY_DEVELOPMENT_DSN=https://a33922bc08284c85bd4b10f689778e85:afaa5f7aae1a4f2db85f4809d2ca8adf@sentry.io/191740

// const BASE_URL = 'http://104.131.10.204:3000/api'
const BASE_URL = 'http://localhost:3000/api'
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const request = function(path) {
  const params = {
    headers: {
      ...DEFAULT_HEADERS,
    },
  }

  const response = fetch(`${BASE_URL}${path}`, params)

  response.catch(error => {
    console.error(error)
  })

  return response.then(res => {
    if (res.ok) {
      return res.json()
    }
    return res.json().then(json => Promise.reject(json))
  })
}

export default request
