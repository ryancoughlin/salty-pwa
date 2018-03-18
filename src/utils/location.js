export function fetchLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(
      position => {
        resolve(position.coords)
      },
      error => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000 * 60,
        timeout: 27000,
      },
    )
  })
}
