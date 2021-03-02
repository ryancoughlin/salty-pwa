export const userLocation = () => {
  const geolocation = navigator.geolocation

  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      console.log('FIND!!!!!')
      geolocation.getCurrentPosition(success, error)
    } else {
      reject(new Error('Geolocation is not supported by this browser!'))
    }
  })

  function error() {
    alert(`ERROR(${error.code}): ${error.message}`)
    reject(error)
  }

  function success(position) {
    alert(position.coord)
    navigator.geolocation.clearWatch(watchID)
    resolve(position.coords)
  }
}
