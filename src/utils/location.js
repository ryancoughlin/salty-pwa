export function fetchLocation() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position.coords)
      },
      error => {
        console.error(error)
      },
    )
  })
}
