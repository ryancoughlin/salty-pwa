import React from 'React'

currentWindSpeed = () => {
  const wind = this.props.weather.wind;

  const now = moment();
  const currentWindIndex = _.findIndex(wind, (hourly) => {
    const time = moment.utc(hourly.time).local();
    return now.diff(time) <= 0;
  });

  return wind[currentWindIndex].windSpeed;
}

const SeaDetails = ({swell}) => (
  <WaterTemperature />
  <ConditionRow
  label="Wave Height"
  value={`${swell.height}' / ${this.currentWindSpeed()}`}
  dark
  />
  <ConditionRow label="Period" value={`${this.state.period}s`} dark />
)

export default SeaDetails;