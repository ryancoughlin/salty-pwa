import React from 'react';
import Icon from '../../common/icon';

const weatherTypes = {
  'clear-day': <Icon.Sun />,
  'partly-cloudy-day': <Icon.PartlySunny />,
  'partly-cloudy-night': <Icon.PartlySunny />,
  wind: <Icon.Wind />,
  rain: <Icon.Rain />,
  cloudy: <Icon.Cloudy />,
  fog: <Icon.Fog />,
  snow: <Icon.Snow />,
};

const WeatherIcon = ({ weather }) => (
  <div>{weatherTypes[weather] || <Icon.Sun />}</div>
);

export default WeatherIcon;
