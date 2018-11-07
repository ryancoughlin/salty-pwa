import React from 'react';
import glamorous from 'glamorous';
import UI from '../../assets/ui';

const LocationName = ({ locationName }) => (
  <UI.Type.SecondaryHeader marginBottom={4}>
    {locationName}
  </UI.Type.SecondaryHeader>
);

export default LocationName;
