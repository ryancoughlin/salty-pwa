import Geocode from 'react-geocode'

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

export function geoCodeLocation(location) {
  return new Promise(resolve => {
    console.log('Location passed into geocode:', location)
    const { latitude, longitude } = location

    Geocode.setApiKey('AIzaSyAB4Hyk0FUOkDXaBSZu0Q1NYOYjxG3Nh7E')
    Geocode.fromLatLng(latitude, longitude).then(
      response => {
        const address = response.results[0].formatted_address
        console.log(address)
      },
      error => {
        console.error(error)
      },
    )
  })
}
