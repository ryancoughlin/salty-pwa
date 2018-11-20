const swellType = (windSpeed) => {
  if (windSpeed < 5.75) {
    return 'Smooth Calm';
  } if (windSpeed >= 5.75 && windSpeed <= 11.51) {
    return 'Light Chop';
  } if (windSpeed >= 11.52 && windSpeed <= 17.26) {
    return 'Moderate Chop';
  } if (windSpeed >= 17.27 && windSpeed <= 23.016) {
    return 'Choppy';
  } if (windSpeed >= 23.017 && windSpeed <= 28.769) {
    return 'Rough';
  }
  return 'Very Rough';
};

export default swellType;
