import React, { Component } from 'react'
import ConditionRow from '../currently/condition-row'
import request from '../../utils/request'

const WaterTemperature = class extends Component {
  state = {
    currentTemp: JSON.parse(localStorage.getItem('currentTemp')),
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.location

    request(
      `/water-temperature?latitude=${latitude}&longitude=${longitude}`,
    ).then(latestReading => {
      const currentTemp = latestReading.temperature
      this.setState({ currentTemp })
      localStorage.setItem('currentTemp', JSON.stringify(currentTemp))
    })
  }

  render() {
    const { currentTemp } = this.state

    if (!currentTemp) {
      return null
    }

    return <ConditionRow label={'Water Temp'} value={`${currentTemp}°`} />
  }
}

export default WaterTemperature
