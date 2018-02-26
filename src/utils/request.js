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

  const response = fetch(`${process.env.REACT_APP_BASE_URL}${path}`, params)

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
