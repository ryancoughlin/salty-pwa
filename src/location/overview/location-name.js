import React from 'react';
import glamorous from 'glamorous';

const LocationName = ({ locationName }) => (
  <Location>
    {locationName}
  </Location>
);

const Location = glamorous.div({
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 2,
});

export default LocationName;
