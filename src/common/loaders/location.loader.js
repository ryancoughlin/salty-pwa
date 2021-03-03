import React from 'react'
import ContentLoader from 'react-content-loader'

const LocationLoader = (props) => (
  <ContentLoader
    speed={2}
    width={366}
    height={116}
    viewBox="0 0 366 116"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="4" ry="4" width="86" height="12" />
    <rect x="0" y="19" rx="4" ry="4" width="86" height="12" />
    <rect x="0" y="61" rx="4" ry="4" width="234" height="28" />
    <rect x="0" y="104" rx="4" ry="4" width="178" height="12" />
  </ContentLoader>
)

export default LocationLoader
