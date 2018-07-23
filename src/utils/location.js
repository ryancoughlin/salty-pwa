export const userLocation = () => {
  const geolocation = navigator.geolocation
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Geolocation is not supported by this browser!'))
    }

    geolocation.getCurrentPosition(
      position => {
        resolve(position.coords)
      },
      error => {
        reject(error)
      },
      { maximumAge: 60 * 60 * 1000 },
    )
  })

  return location
}
