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
    const { latitude, longitude } = location

    Geocode.setApiKey('AIzaSyAB4Hyk0FUOkDXaBSZu0Q1NYOYjxG3Nh7E')
    Geocode.fromLatLng(latitude, longitude).then(
      response => {
        const cityName = response.results[0].address_components[3].long_name
        resolve(cityName)
      },
      error => {
        console.error(error)
      },
    )
  })
}
