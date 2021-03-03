const DEFAULT_HEADERS = {
  Accept: 'application/json',
}

const geocodeLocation = (location) => {
  const params = {
    headers: {
      ...DEFAULT_HEADERS,
    },
  }

  const response = fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${process.env.GOOGLE_KEY}`,
    params,
  )

  response.catch((error) => {
    console.error(error)
  })

  return response.then((res) => {
    console.log(res)
    if (res.ok) {
      return res.json()
    }
    return res.json().then((json) => Promise.reject(json))
  })
}

export default geocodeLocation
